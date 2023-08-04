<template>
  <v-dialog v-model="show" max-width="400">
    <v-card>
      <v-card-title>Adicionar Nova Tarefa</v-card-title>
      <v-card-text>
        <v-text-field variant="underlined" v-model="newTask" label="Nova Tarefa"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="toggleModal">Cancelar</v-btn>
        <v-btn text color="primary" @click="saveTask">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    taskTitle: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      show: false,
      newTask: "",
    };
  },
  methods: {
    openDialog() {
      this.show = true;
    },
    saveTask() {
      this.$emit("add-task", this.newTask);
      this.toggleModal();
    },
    toggleModal() {
      this.newTask = "";
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
  .v-icon:hover {
    cursor: pointer;
    color: #2196f3; /* Cor do ícone ao passar o mouse */
  } 
  .v-btn:hover {
    background-color: #f2f2f2; /* Cor de fundo ao passar o mouse */
  }
</style>
