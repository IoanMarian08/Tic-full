<template>
  <div id="generalItemsInfo">
    <h1>Editare desktop</h1>
    <input
      id="input"
      v-model="state.newDesktop.nume"
      type="text"
      placeholder="Nume"
    />
    <input
      id="input"
      v-model="state.newDesktop.pret"
      type="text"
      placeholder="Pret"
    />
    <input
      id="input"
      v-model="state.newDesktop.culoare"
      type="text"
      placeholder="Culoare"
    />
    <input
      id="input"
      v-model="state.newDesktop.descriere"
      type="text"
      placeholder="Descriere"
    />

    <div class="card-body">
      <button id="btnEdit" @click="modifica">Editeaza</button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";

export default {
  name: "DesktopEdit",
  props: {
    desktop: {
      type: Object,
    },
  },
  setup(props, context) {
    const store = useStore();
    const state = reactive({
      desktop: props.desktop,
      newDesktop: {
        id: store.state.desktop.id,
        nume: store.state.desktop.nume,
        pret: store.state.desktop.pret,
        culoare: store.state.desktop.culoare,
        descriere: store.state.desktop.descriere,
      },
    });

    function modifica() {
      context.emit("editDesktop", state.newDesktop);
    }
    return {
      state,
      modifica,
    };
  },
};
</script>

<style scoped></style>
