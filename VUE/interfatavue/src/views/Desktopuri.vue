<template>
  <div>
    <div id="desktopuriCol">
      <Desktop :desktop="elem" v-for="elem in desktopuri" :key="elem.id" />
    </div>
  </div>
</template>

<script>
import Desktop from "../components/Desktop.vue";
import utils from "../utils.js";

export default {
  name: "Desktopuri",
  components: {
    Desktop,
  },
  data() {
    return {};
  },
  created() {
    let url = utils.url;
    let requestParam = utils.globalRequestParameters;
    requestParam.headers.Authorization = "Bearer " + localStorage.token;
    if (!this.desktopuri.length) {
      fetch(url + "desktopuri", requestParam).then((res) =>
        res.json().then((res) => {
          this.$store.dispatch("fetchDesktopuri", res);
        })
      );
    }
  },
  computed: {
    desktopuri() {
      return this.$store.state.desktopuri;
    },
  },
};
</script>

<style>
#desktopuriCol {
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
}
</style>