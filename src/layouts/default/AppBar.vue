<template>
  <v-navigation-drawer v-model="isDrawerOpen">
    <v-list>
      <v-list-subheader>Ações</v-list-subheader>
      <v-list-item prepend-icon="mdi-plus">Adicionar tarefa</v-list-item>
    </v-list>
    <CreateTaskDialog />
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
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue';
import CreateTaskDialog from '@/components/CreateTaskDialog.vue';

const props = defineProps(['theme']);
// Declare o evento personalizado usando a opção "emits"
const emit = defineEmits(['update-theme']);

const components = {
  CreateTaskDialog, 
};

const isDrawerOpen = ref(false);

const toggleTheme = () => {
  emit('update-theme', !props.theme.dark);
};

const iconName = computed(() => {
  return props.theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny';
});
</script>
