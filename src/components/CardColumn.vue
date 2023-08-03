<template>
  <v-card
    class="mx-auto"
    max-width="350"
    min-width="200"
  >
    <v-toolbar :color="taskCategoryColor" dense flat>
      <v-icon class="pa-6">{{ iconTaskCategory }}</v-icon>
      <v-toolbar-title>{{ taskTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon color="white" v-if="taskTitle === 'A FAZER' ">
        <v-icon>mdi-pencil-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <CardTableTask 
        :iconTaskStatus="iconTaskStatus" 
        :tasks="tasks" 
        @update-task="updateTaskStatus" />
    </v-card-text>
  </v-card>
</template>

<script>
import CardTableTask from '@/components/CardTableTask.vue';

export default {
  components: {
    CardTableTask,
  },
  props: {
    iconTaskCategory: {
      type: String,
      required: true,
    },
    iconTaskStatus: {
      type: String,
      required: true,
    },
    taskTitle: {
      type: String,
      required: true,
    },
    taskCategoryColor: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    }
  },
  methods: {
    updateTaskStatus(updatedTaskStatus) {
      console.log("Chamou o método updateTaskStatus no componente CardColumn.vue")
      this.$emit('update-task', updatedTaskStatus);
    }
  }
};
</script>