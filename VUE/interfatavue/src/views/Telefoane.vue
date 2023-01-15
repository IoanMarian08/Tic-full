<template>
  <div>
    <div id="telefoaneCol">
      <Telefon :telefon="elem" v-for="elem in telefoane" :key="elem.id" />
    </div>
  </div>
</template>


<script>
import Telefon from "../components/Telefon.vue";
import utils from "../utils.js";

export default {
  name: "Telefoane",
  components: {
    Telefon,
  },
  data() {
    return {};
  },
  created() {
    let url = utils.url;
    let requestParam = utils.globalRequestParameters;
    requestParam.headers.Authorization = "Bearer " + localStorage.token;
    if (!this.telefoane.length) {
      fetch(url + "telefoane", requestParam).then((res) =>
        res.json().then((res) => {
          this.$store.dispatch("fetchTelefoane", res);
        })
      );
    }
  },
  computed: {
    telefoane() {
      return this.$store.state.telefoane;
    },
  },
};
</script>

<style>
#telefoaneCol {
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
}
</style>