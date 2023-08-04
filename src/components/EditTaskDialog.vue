<template>
  <v-dialog v-model="show" max-width="400">
    <v-card>
      <v-card-title>Editar Tarefa</v-card-title>
      <v-card-text>
        <v-text-field hide-details="auto" v-model="editedTask" label="Tarefa"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancelar</v-btn>
        <v-btn text color="primary" @click="saveTask">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      editedTask: "",
    };
  },
  methods: {
    openDialog(task) {
      this.editedTask = task.body;
      this.show = true;
    },
    closeDialog() {
      this.show = false;
    },
    saveTask() {
      const editedTaskData = {
        ...this.taskToEdit,
        body: this.editedTask,
      };
      this.$emit("editTaskText", editedTaskData);
      this.closeDialog();
    },
  },
  props: {
    taskToEdit: {
      type: Object,
      default: null,
    },
  },
};
</script>
