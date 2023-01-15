<template>
  <div>
    <div class="oneDesktop">
      <ul class="three-col-row">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">{{ desktop.nume }}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Pret: {{ desktop.pret + " EUR" }}</li>
            <li class="list-group-item">Culoare: {{ desktop.culoare }}</li>
          </ul>
          <p class="card-text">{{ desktop.descriere }}</p>
          <div class="card-body">
            <button class="card-link" @click="editDesktop">Edit</button>
            <button class="card-link" @click="deleteDesktop">Delete</button>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import utils from "../utils.js";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Desktop",
  props: {
    desktop: Object,
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      desktop: props.desktop,
    });

    function editDesktop() {
      let requestParameters = utils.globalRequestParameters;
      requestParameters.method = "GET";
      requestParameters.body = null;
      fetch(utils.url + "desktop/" + state.desktop.id, requestParameters).then(
        (res) =>
          res.json().then((res) => {
            store.dispatch("setDesktop", res);
            router.push({ path: "/editdesktop/" + state.desktop.id });
          })
      );
    }

    function deleteDesktop() {
      context.emit("deleteDes", state.desktop);
      let url = utils.url;
      let requestParameters = utils.globalRequestParameters;
      requestParameters.method = "DELETE";
      requestParameters.body = null;
      fetch(url + "desktop/" + state.desktop.id, requestParameters).then(
        (res) => res.json().then((res) => console.log(res))
      );
    }

    return {
      state,
      editDesktop,
      deleteDesktop,
    };
  },
};
</script>

<style scoped>
.card {
  border-style: outset;
  border-color: black;
  border-width: 0.01vw;
  margin-top: 20px;
  margin-left: 70px;
  background-color: #8DD3D3;
  border-radius: 15px;
}

.card-title {
  font-size: 16px;
}

button {
  background-color: #d4f0d7;
  border-radius: 15px;
  border: none;
  padding: 5px 10px;
  font-size: medium;
  font-size: 15px;
  margin-bottom: 10px;
  margin-left: 35px;
}

li.list-group-item {
  font: 16px bold;
  margin-right: 40px;
  padding: 12px 20px;
  border-style: ridge;
  border-color: 1px black;
  margin-bottom: 3px;
  list-style: none;
}
</style>
