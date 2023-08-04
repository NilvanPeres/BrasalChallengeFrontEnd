<template>
  <v-app>
    <default-bar :theme="theme" @update-theme="toggleTheme" />
    <default-view />
  </v-app>
</template>

<script>
import DefaultBar from './AppBar.vue';
import DefaultView from './View.vue';
import { useTheme } from 'vuetify';

export default {
  components: {
    DefaultBar,
    DefaultView
  },
  setup() {
    const theme = useTheme();

    const toggleTheme = () => {
      console.log('Tema alternado')
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark' 

    };

    return {
      theme,
      toggleTheme
    };
  }
};
</script>

<style>
.v-data-table-footer__items-per-page {
  display: none !important;
}
th {
  display: none !important;
}
</style>
