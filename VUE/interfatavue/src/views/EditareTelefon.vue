<template>
  <div>
    <TelefonEdit :telefon="telefon" @editTelefon="editTelefon" />
  </div>
</template>

<script>
import TelefonEdit from "../components/TelefonEdit.vue";
import { useStore } from "vuex";
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import utils from "../utils.js";
export default {
  name: "EditareTelefon",
  components: { TelefonEdit },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      telefon: store.state.telefon,
    });

    const telefon = computed(() => store.state.telefon);
    console.log(telefon);
    function editTelefon(telefon) {
      console.log(telefon);
      store.dispatch("editTelefon", telefon);
      let url = utils.url;
      let requestParam = utils.globalRequestParameters;
      requestParam.method = "PUT";
      requestParam.body = JSON.stringify(telefon);
      fetch(url + "telefon/" + telefon.id, requestParam).then((res) => {
        console.log(res);
        router.push({ path: `/meniu` });
      });
    }

    return {
      state,
      telefon,
      editTelefon,
    };
  },
};
</script>
<style></style>
