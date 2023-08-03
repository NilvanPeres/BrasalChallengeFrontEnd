<template>
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
        <v-icon small class="mr-2" @click="editItem(item.raw)">
          mdi-pencil
        </v-icon>
        <v-icon small class="mr-2" @click="deleteItem(item.raw)">
          mdi-delete
        </v-icon>
        <v-btn icon size="tiny" color="white" class="mr-2"  @click="$emit('update-task', item.raw)">
          <v-icon>{{ iconTaskStatus }}</v-icon>
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import { VDataTable } from 'vuetify/lib/labs/components.mjs';
export default {
  components: {
    VDataTable,
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
        { text: 'Tarefa', key: 'task' },
        { text: 'Ações', key: 'actions', sortable: false },
      ],

    };
  },
  mounted() {
    console.log(this.tasks);
  },
  methods: {
    editItem(item) {
      console.log(item);
      // lógica para editar a tarefa
    },
    deleteItem(item) {
      console.log(item);
      // lógica para excluir a tarefa
    },
  },
};
</script>