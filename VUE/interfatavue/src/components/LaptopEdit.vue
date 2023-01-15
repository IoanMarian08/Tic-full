<template>
  <div id="generalItemsInfo">
    <h1>Editare laptop</h1>
    <input
      id="input"
      v-model="state.newLaptop.nume"
      type="text"
      placeholder="Nume"
    />
    <input
      id="input"
      v-model="state.newLaptop.pret"
      type="text"
      placeholder="Pret"
    />
    <input
      id="input"
      v-model="state.newLaptop.culoare"
      type="text"
      placeholder="Culoare"
    />
    <input
      id="input"
      v-model="state.newLaptop.descriere"
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
  name: "LaptopEdit",
  props: {
    laptop: {
      type: Object,
    },
  },
  setup(props, context) {
    const store = useStore();
    const state = reactive({
      laptop: props.laptop,
      newLaptop: {
        id: store.state.laptop.id,
        nume: store.state.laptop.nume,
        pret: store.state.laptop.pret,
        culoare: store.state.laptop.culoare,
        descriere: store.state.laptop.descriere,
      },
    });

    function modifica() {
      console.log(store.state.laptop);
      console.log(state.newLaptop);
      context.emit("editLaptop", state.newLaptop);
    }
    return {
      state,
      modifica,
    };
  },
};
</script>

<style scoped></style>
