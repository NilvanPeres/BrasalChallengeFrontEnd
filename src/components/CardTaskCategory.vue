<template>
  <v-card
    class="mx-auto elevation-0 border"
    max-width="350"
    min-width="200"
  >
    <v-toolbar :color="taskCategoryColor" dense flat>
      <v-icon class="pa-6">{{ iconTaskCategory }}</v-icon>
      <v-toolbar-title class="text-xs-h7 text-md-h6">{{ taskTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="taskTitle === 'POR FAZER'" @click="openCreateTaskDialog" icon color="white">
        <v-icon>mdi-pencil-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text class=text-break>
      <CardTableTask 
        :iconTaskStatus="iconTaskStatus" 
        :tasks="tasks" 
        @update-task="updateTaskStatus" 
        @delete-task="deleteTask"
        @edit-task-text="editTaskText"
      />
    </v-card-text>
    <CreateTaskDialog ref="createTaskDialog" @add-task="addTask" />
  </v-card>
</template>

<script>

import CardTableTask from '@/components/CardTableTask.vue';
import CreateTaskDialog from '@/components/CreateTaskDialog.vue';


export default {
  components: {
    CardTableTask,
    CreateTaskDialog,
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
  data () {
    return {
    };
  },
  methods: {
    updateTaskStatus(updatedTaskStatus) {
      this.$emit('update-task', updatedTaskStatus);
    },
    addTask(newTaskText) {
      this.$emit('add-task', newTaskText);
    },
    deleteTask(task) {
      this.$emit('delete-task', task);
    },
    editTaskText(task) {
      this.$emit('edit-task-text', task);
    },
    openCreateTaskDialog() {
      this.$refs.createTaskDialog.openDialog();
    },
  }
};
</script>