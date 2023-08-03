<template>
  <v-container >
    <v-row>
      <v-col col="12" md="6">
        <CardColumn 
          iconTaskCategory="mdi-format-list-checks" 
          taskTitle="A FAZER"
          taskCategoryColor="primary"
          iconTaskStatus="mdi-check"
          :tasks="incompleteTasks"
          @update-task="updateTaskStatus"
        />
      </v-col>
      <v-col col="12" md="6">
        <CardColumn 
          iconTaskCategory="mdi-check-outline"
          taskTitle="FEITO" 
          taskCategoryColor="success"
          iconTaskStatus="mdi-undo"
          :tasks="completeTasks"
          @update-task="updateTaskStatus"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardColumn from '@/components/CardColumn.vue';

export default {
  components: {
    CardColumn,
  },
  data() {
    return {
      tasks: [
        { task: 'Tarefa 1', completed: false },
        { task: 'Tarefa 2', completed: true },
        { task: 'Tarefa 3', completed: false },
        // Adicione mais tarefas aqui conforme necessário
      ],
    };
  },
  computed: {
    incompleteTasks() {
      return this.tasks.filter(task => !task.completed);
    },
    completeTasks() {
      return this.tasks.filter(task => task.completed);
    }
  },
  methods: {
    updateTaskStatus(updatedTaskStatus) {
      console.log("Chamou o método updateTaskStatus no componente Home.vue")
      const index = this.tasks.findIndex(task => task === updatedTaskStatus);
      if (index !== -1) {
        this.tasks[index].completed = !this.tasks[index].completed;
      }
    }
  }
};
</script>
