<template id="body">
  <div>
    <div id="btnsMenuCreate">
      <button id="btnbtnCreate" @click="arataCreateLaptop">Laptopuri</button>
      <button id="btnbtnCreate" @click="arataCreateTelefon">Telefoane</button>
      <button id="btnbtnCreate" @click="arataCreateDesktop">Desktopuri</button>
    </div>

    <div id="divElec" v-show="this.showCreateLaptop">
      <CreateLaptop />
    </div>
    <div id="divElec" v-show="this.showCreateTelefon">
        <CreateTelefon />
    </div>
    <div id="divElec" v-show="this.showCreateDesktop">
        <CreateDesktop />
    </div>
  </div>
</template>

<script>
import CreateLaptop from '../components/CreateLaptop.vue'
import CreateTelefon from '../components/CreateTelefon.vue'
import CreateDesktop from '../components/CreateDesktop.vue'

export default {
  name: "Create",
  components: {CreateLaptop, CreateTelefon, CreateDesktop},
   data() {
    return {
      showCreateLaptop: false,
      showCreateTelefon: false,
      showCreateDesktop: false,
    };
  },
  methods: {
      arataCreateLaptop() {
          this.showCreateLaptop = !this.showCreateLaptop
      },
      arataCreateTelefon() {
          this.showCreateTelefon = !this.showCreateTelefon
      },
      arataCreateDesktop() {
          this.showCreateDesktop = !this.showCreateDesktop
      }
  }
};
</script>

<style>
#body {
  margin: 0px;
}

#btnbtnCreate {
  margin-right: 30px;
  font-size: 20px;
  height: 60px;
  margin-top: 20px;
  background-color: #bee5ca;
  border-radius: 15px;
  border-color: #4c9da1;
  padding: 0px 10px;
  font-size: medium;
}
</style>
