<template>
  <v-dialog v-model="show" max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn v-if="taskTitle === 'A FAZER'" v-on="{ click: toggleModal }" icon color="white">
        <v-icon>mdi-pencil-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Adicionar Nova Tarefa</v-card-title>
      <v-card-text>
        <v-text-field v-model="newTask" label="Nova Tarefa"></v-text-field>
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
      required: true,
    },
  },
  data() {
    return {
      show: false,
      newTask: "",
    };
  },
  methods: {
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
