<template>
  <v-dialog v-model="show" max-width="400">
    <v-card>
      <v-card-title>Confirmar Exclusão</v-card-title>
      <v-card-text>
        Tem certeza de que deseja excluir esta tarefa?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeConfirmation">Cancelar</v-btn>
        <v-btn text color="primary" @click="confirmDeletion">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      taskToDelete: null,
    };
  },
  methods: {
    openConfirmation(task) {
      this.taskToDelete = task;
      this.show = true;
    },
    closeConfirmation() {
      this.taskToDelete = null;
      this.show = false;
    },
    confirmDeletion() {
      this.$emit('delete-task', this.taskToDelete);
      this.closeConfirmation();
    },
  },
};
</script>
