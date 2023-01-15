<template>
  <div>
    <LaptopEdit :laptop="laptop" @editLaptop="editLaptop" />
  </div>
</template>

<script>
import LaptopEdit from "../components/LaptopEdit.vue";
import { useStore } from "vuex";
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import utils from "../utils.js";
export default {
  name: "EditareLaptop",
  components: { LaptopEdit },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      laptop: store.state.laptop,
    });

    const laptop = computed(() => store.state.laptop);
    console.log(laptop);
    function editLaptop(laptop) {
      console.log(laptop);
      store.dispatch("editLaptop", laptop);
      let url = utils.url;
      let requestParam = utils.globalRequestParameters;
      requestParam.method = "PUT";
      requestParam.body = JSON.stringify(laptop);
      fetch(url + "laptop/" + laptop.id, requestParam).then((res) => {
        console.log(res);
        router.push({ path: `/meniu` });
      });
    }

    return {
      state,
      laptop,
      editLaptop,
    };
  },
};
</script>
<style></style>
