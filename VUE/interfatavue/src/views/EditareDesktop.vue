<template>
  <div>
    <DesktopEdit :desktop="desktop" @editDesktop="editDesktop" />
  </div>
</template>

<script>
import DesktopEdit from "../components/DesktopEdit.vue";
import { useStore } from "vuex";
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import utils from "../utils.js";
export default {
  name: "EditareDesktop",
  components: { DesktopEdit },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      desktop: store.state.desktop,
    });

    const desktop = computed(() => store.state.desktop);

    function editDesktop(desktop) {
      store.dispatch("editDesktop", desktop);
      let url = utils.url;
      let requestParam = utils.globalRequestParameters;
      requestParam.method = "PUT";
      requestParam.body = JSON.stringify(desktop);
      fetch(url + "desktop/" + desktop.id, requestParam).then((res) => {
        console.log(res);
        router.push({ path: `/meniu` });
      });
    }

    return {
      state,
      desktop,
      editDesktop,
    };
  },
};
</script>
<style></style>
