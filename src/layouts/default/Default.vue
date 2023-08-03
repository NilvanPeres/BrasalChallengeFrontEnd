<template>
  <v-app>
    <default-bar />

    <default-view />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
</script>

<style>
  .v-data-table-footer__items-per-page {
    display: none !important;
  }
  th {
    display: none !important;
  }
</style>
