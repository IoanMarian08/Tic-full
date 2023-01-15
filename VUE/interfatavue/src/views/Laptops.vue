<template>
  <div>
    <div id="laptopCol">
      <Laptop :laptop="elem" v-for="elem in laptops" :key="elem.id" />
    </div>
  </div>
</template>


<script>
import Laptop from "../components/Laptop.vue";
import utils from "../utils.js";

export default {
  name: "Laptops",
  components: {
    Laptop,
  },
  data() {
    return {};
  },
  created() {
    let url = utils.url;
    let requestParam = utils.globalRequestParameters;
    requestParam.headers.Authorization = "Bearer " + localStorage.token;
    if (!this.laptops.length) {
      fetch(url + "laptopuri", requestParam).then((res) =>
        res.json().then((res) => {
          this.$store.dispatch("fetchLaptops", res);
        })
      );
    }
  },
  computed: {
    laptops() {
      return this.$store.state.laptops;
    },
  },
};
</script>

<style>
#laptopCol {
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
}
</style>