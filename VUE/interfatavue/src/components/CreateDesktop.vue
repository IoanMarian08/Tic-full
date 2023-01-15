<template>
  <div id="generalItemsInfo">
    <h1>Creare desktop</h1>
    <input id="input" v-model="nume" type="text" placeholder="Nume" />
    <input id="input" v-model="pret" type="text" placeholder="Pret" />
    <input id="input" v-model="culoare" type="text" placeholder="Culoare" />
    <input id="input" v-model="descriere" type="text" placeholder="Descriere" />

    <div class="card-body">
      <button id="btnCreate" @click="addDesktop">Creaza</button>
    </div>

    <div>
      {{ mesaj }}
    </div>
  </div>
</template>

<script>
import utils from "../utils.js";

export default {
  name: "CreateDesktop",
  data() {
    return {
      nume: "",
      descriere: "",
      pret: "",
      culoare: "",
      mesaj: "",
    };
  },
  methods: {
    addDesktop() {
      let data = {
        nume: this.nume,
        descriere: this.descriere,
        pret: this.pret,
        culoare: this.culoare,
        idVanzator: this.$store.state.seller.id,
      };
      console.log(data);
      let requestParameters = utils.globalRequestParameters;
      requestParameters.method = "POST";
      requestParameters.headers.Authorization = "Bearer " + localStorage.token;
      requestParameters.body = JSON.stringify(data);
      fetch(utils.url + "adddesktop", requestParameters).then((res) => {
        res.text().then((res) => {
          this.mesaj = res;
          console.log(this.mesaj);
        });
      });
      this.$router.push({ path: "/meniu" });
    },
  },
};
</script>

<style>
/* .card {
  border-style: outset;
  border-color: crimson;
  margin-top: 20px;
  margin-left: 70px;
}

.card-title {
  font-size: 16px;
}

button {
  background-color: darkgrey;
  height: 35px;
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
} */
</style>
