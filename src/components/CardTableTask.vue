<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="tasks"
      :items-per-page="5"
      :footer-props="{
        itemsPerPageOptions: [5],
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
      }"
    >
      <template v-slot:item.actions="{ item }">
        <div class="d-flex align-center">
          <v-icon small class="mr-2" @click="showEditDialog(item.raw)">
            mdi-pencil
          </v-icon>
          <v-icon small class="mr-2" @click="showDeleteConfirmation(item.raw)">
            mdi-delete
          </v-icon>
          <v-btn icon size="tiny" color="white" class="mr-2" @click="$emit('update-task', item.raw)">
            <v-icon>{{ iconTaskStatus }}</v-icon>
          </v-btn>
        </div>
      </template>
      <template v-slot:item.body="{ item }">
        <td :class="{ 'task-done': item.raw.status === 'DONE' }">{{ item.raw.body }}</td>
      </template>
    </v-data-table>
    <DeleteTaskDialog @delete-task="deleteTask" ref="deleteConfirmation" />
    <EditTaskDialog @edit-task-text="editTaskText" :taskToEdit="taskToEdit" ref="editDialog" />
  </div>
</template>

<script>
import DeleteTaskDialog from '@/components/DeleteTaskDialog.vue';
import EditTaskDialog from '@/components/EditTaskDialog.vue';
import { VDataTable } from 'vuetify/lib/labs/components.mjs';

export default {
  components: {
    VDataTable,
    DeleteTaskDialog,
    EditTaskDialog,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    iconTaskStatus: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        { text: 'Tarefa', key: 'body' },
        { text: 'Ações', key: 'actions', sortable: false },
      ],
      taskToEdit: null,
    };
  },
  methods: {
    showEditDialog(task) {
      this.taskToEdit = task;
      this.$refs.editDialog.openDialog(task);
    },
    showDeleteConfirmation(task) {
      this.$refs.deleteConfirmation.openConfirmation(task);
    },
    deleteTask(task) {
      if (task) {
        console.log('Tarefa a ser excluída:', task);
        this.$emit('delete-task', task);
      }
    },
    editTaskText(updatedTask) {
      this.$emit('edit-task-text', updatedTask);
    },
  },
};
</script>

<style scoped>
  .task-done {
    text-decoration: line-through;
  }
</style>
