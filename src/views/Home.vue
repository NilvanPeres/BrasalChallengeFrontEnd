<template>
  <v-container>
    <v-text-field
      label="Buscar tarefa"
      v-model="searchText"
      clearable
      color="primary"
      dense
      variant=outlined
      background-color="white"
      @click:clear="searchText = ''"
    />
    <v-row>
      <v-col col="12" md="6">
        <CardTaskCategory 
          iconTaskCategory="mdi-format-list-checks" 
          taskTitle="POR FAZER"
          taskCategoryColor="primary"
          iconTaskStatus="mdi-check"
          :tasks="filteredIncompleteTasks"
          @update-task="updateTaskStatus"
          @add-task="addTask"
          @delete-task="deleteTask"
          @edit-task-text="editTaskText"
        />
      </v-col>
      <v-col col="12" md="6">
        <CardTaskCategory 
          iconTaskCategory="mdi-check-outline"
          taskTitle="FEITO" 
          taskCategoryColor="success"
          iconTaskStatus="mdi-undo"
          :tasks="filteredCompleteTasks"
          @update-task="updateTaskStatus"
          @delete-task="deleteTask"
          @edit-task-text="editTaskText"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardTaskCategory from '@/components/CardTaskCategory.vue';
import tasksService from '@/services/tasks.js';

import { toast } from 'vue3-toastify'

export default {
  components: {
    CardTaskCategory,
  },
  data() {
    return {
      tasks: [],
      searchText: '',
    };
  },
  computed: {
    filteredIncompleteTasks() {
      if (this.searchText === '') {
        return this.tasks.filter(task => task.status === 'TODO');
      } else {
        return this.tasks.filter(task => task.status === 'TODO' && task.body.includes(this.searchText));
      }
    },
    filteredCompleteTasks() {
      if (this.searchText === '') {
        return this.tasks.filter(task => task.status === 'DONE');
      } else {
        return this.tasks.filter(task => task.status === 'DONE' && task.body.includes(this.searchText));
      }
    }
  },

  mounted () {
    this.getAllTasks();
  },
  methods: {
    updateTaskStatus(updatedTaskStatus) {
      const index = this.tasks.findIndex(task => task === updatedTaskStatus);
      if (index !== -1) {
        this.tasks[index].status = this.tasks[index].status === 'TODO' ? 'DONE' : 'TODO';
        tasksService.updateTask(this.tasks[index]._id, this.tasks[index]).then(() => {
          toast.success(`Tarefa '${this.tasks[index].body}' movida de categoria !`);
        }).catch(error => {
          toast.error('Erro ao atualizar tarefa: ' + error.message);
        });
      }
    },
    async getAllTasks () {
      try {
        const response = await tasksService.getTasks();
        this.tasks = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addTask(newTaskText) {
      try {
        const response = await tasksService.createTask({ body: newTaskText, status: 'TODO' });
        if (response) this.tasks.push(response.data);
        toast.success(`Tarefa '${newTaskText}' adicionada com sucesso!`);
      } catch (error) {
        toast.error('Erro ao adicionar tarefa: ' + error.message)
        console.log(error);
      }
    },
    async deleteTask(task) {
      try {
        await tasksService.deleteTask(task._id);
        const index = this.tasks.findIndex(t => t === task);
        if (index !== -1) {
          this.tasks.splice(index, 1);
        }
        toast.success(`Tarefa '${task.body}' removida com sucesso !`);
      } catch (error) {
        toast.error('Erro ao excluir tarefa: ' + error.message)
        console.log(error);
      }
    },
    async editTaskText(task) {
      try {
        await tasksService.updateTask(task._id, task);
        this.getAllTasks();
        toast.success('Tarefa editada com sucesso!');
      } catch (error) {
        console.log(error);
        toast.error('Erro ao editar tarefa: ' + error.message);
      }
    },
  }
};
</script>
