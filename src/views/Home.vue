<template>
  <v-container >
    <v-row>
      <v-col col="12" md="6">
        <CardTaskCategory 
          iconTaskCategory="mdi-format-list-checks" 
          taskTitle="A FAZER"
          taskCategoryColor="primary"
          iconTaskStatus="mdi-check"
          :tasks="incompleteTasks"
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
          :tasks="completeTasks"
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


export default {
  components: {
    CardTaskCategory,
  },
  data() {
    return {
      tasks: [],
    };
  },
  computed: {
    incompleteTasks() {
      return this.tasks.filter(task => task.status === 'TODO');
    },
    completeTasks() {
      return this.tasks.filter(task => task.status === 'DONE');
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
        tasksService.updateTask(this.tasks[index]._id, this.tasks[index]);
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
        this.tasks.push(response.data);
      } catch (error) {
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
      } catch (error) {
        console.log(error);
      }
    },
    async editTaskText(task) {
      try {
        await tasksService.updateTask(task._id, task);
        this.getAllTasks();
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
