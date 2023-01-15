<template>
  <div id="generalItemsInfo">
    <h1>Editare telefon</h1>
    <input
      id="input"
      v-model="state.newTelefon.nume"
      type="text"
      placeholder="Nume"
    />
    <input
      id="input"
      v-model="state.newTelefon.pret"
      type="text"
      placeholder="Pret"
    />
    <input
      id="input"
      v-model="state.newTelefon.culoare"
      type="text"
      placeholder="Culoare"
    />
    <input
      id="input"
      v-model="state.newTelefon.descriere"
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
  name: "TelefonEdit",
  props: {
    telefon: {
      type: Object,
    },
  },
  setup(props, context) {
    const store = useStore();
    const state = reactive({
      telefon: props.telefon,
      newTelefon: {
        id: store.state.telefon.id,
        nume: store.state.telefon.nume,
        pret: store.state.telefon.pret,
        culoare: store.state.telefon.culoare,
        descriere: store.state.telefon.descriere,
      },
    });

    function modifica() {
      context.emit("editTelefon", state.newTelefon);
    }
    return {
      state,
      modifica,
    };
  },
};
</script>

<style scoped></style>
