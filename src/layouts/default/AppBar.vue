<template>
  <v-navigation-drawer v-model="isDrawerOpen">
    <v-list>
      <v-list-subheader>Ações</v-list-subheader>
      <v-list-item @click="openCreateTaskDialog" prepend-icon="mdi-plus">Adicionar tarefa</v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar flat class="border-b" color="black">
    <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
    <v-app-bar-title>
      Tarefas App
    </v-app-bar-title>
    <template #append>
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ iconName }}</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
  <CreateTaskDialog ref="createTaskDialog" @add-task="addTask" />
</template>

<script>
import CreateTaskDialog from '@/components/CreateTaskDialog.vue';


export default {
  components: {
    CreateTaskDialog,
  },
  props: {
    theme: Object,
  },
  emits: ['update-theme'],
  data() {
    return {
      isDrawerOpen: false,
    };
  },
  computed: {
    iconName() {
      return this.theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny';
    },
  },
  methods: {
    openCreateTaskDialog() {
      this.$refs.createTaskDialog.openDialog();
    },
    addTask(newTaskText) {
      this.emitter.emit('add-task', newTaskText);
    },
    toggleTheme() {
      this.$emit('update-theme', !this.theme.dark);
    },
  },
};
</script>
