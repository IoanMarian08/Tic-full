<template>
  <div>
    <nav id="nav">
      <div id="textDivNav">
        <h3 id="hello">Bine ai venit</h3>
        <p id="titlu"><strong>Meniu</strong></p>
        <button id="Logout" @click="logout">Logout</button>
      </div>
    </nav>
    <div id="btnsMenu">
      <button id="btnbtn" @click="arataLaptopuri">Laptopuri</button>
      <button id="btnbtn" @click="arataTelefoane">Telefoane</button>
      <button id="btnbtn" @click="arataDesktopuri">Desktopuri</button>
    </div>

    <div>
      <p id="pSort">Sorteaza produsele</p>
      <button
        id="sortareCrescatoare"
        @click="
          () => {
            laptops.sort(sortarepret),
              telefoane.sort(sortarepret),
              desktopuri.sort(sortarepret);
          }
        "
      >
        Crescator
      </button>
      <button
        id="sortareDescrescatoare"
        @click="
          () => {
            laptops.sort(sortarepret).reverse(),
              telefoane.sort(sortarepret).reverse(),
              desktopuri.sort(sortarepret).reverse();
          }
        "
      >
        Descrescator
      </button>
    </div>

    <div>
      <router-link to="/create">
        <button id="btnCreate">Creaza un produs</button>
      </router-link>
    </div>

    <div>
      <p id="pProdS">Afiseaza produsele vandute de acest vanzator</p>
      <button id="btnShowItems" @click="arataIteme">
        Afiseaza produsele vanzatorului
      </button>
      <div id="divElec" v-show="this.showItems">
        <Laptop
          :laptop="elem"
          v-for="elem in sellerLaptops"
          :key="elem.id"
          @deleteLap="deleteLap"
        />
        <Telefon
          :telefon="elem"
          v-for="elem in sellerTelefoane"
          :key="elem.id"
          @deleteTel="deleteTel"
        />
        <Desktop
          :desktop="elem"
          v-for="elem in sellerDesktopuri"
          :key="elem.id"
          @deleteDes="deleteDes"
        />
      </div>
    </div>

    <div id="divElec" v-show="this.showLaptops">
      <Laptop
        :laptop="elem"
        v-for="elem in laptops"
        :key="elem.id"
        @deleteLap="deleteLap"
      />
    </div>
    <div id="divElec" v-show="this.showTelefoane">
      <Telefon
        :telefon="elem"
        v-for="elem in telefoane"
        :key="elem.id"
        @deleteTel="deleteTel"
      />
    </div>
    <div id="divElec" v-show="this.showDesktopuri">
      <Desktop
        :desktop="elem"
        v-for="elem in desktopuri"
        :key="elem.id"
        @deleteDes="deleteDes"
      />
    </div>
  </div>
</template>

<script>
import Laptop from "../components/Laptop.vue";
import Telefon from "../components/Telefon.vue";
import Desktop from "../components/Desktop.vue";
import utils, { sortarepret } from "../utils.js";

export default {
  name: "Meniu",
  components: { Laptop, Telefon, Desktop },
  data() {
    return {
      showLaptops: false,
      showTelefoane: false,
      showDesktopuri: false,
      showItems: false,
    };
  },
  created() {
    let url = utils.url;
    let requestParam = utils.globalRequestParameters;
    requestParam.method = "GET";
    requestParam.body = null;
    console.log(localStorage.token);
    fetch(url + "laptopuri", requestParam).then((res) =>
      res.json().then((res) => {
        console.log(res);
        this.$store.dispatch("fetchLaptops", res);
      })
    );

    fetch(url + "telefoane", requestParam).then((res) =>
      res.json().then((res) => {
        console.log(res);
        this.$store.dispatch("fetchTelefoane", res);
      })
    );

    fetch(url + "desktopuri", requestParam).then((res) =>
      res.json().then((res) => {
        console.log(res);
        this.$store.dispatch("fetchDesktopuri", res);
      })
    );
  },

  computed: {
    laptops() {
      return this.$store.state.laptops;
    },
    telefoane() {
      return this.$store.state.telefoane;
    },
    desktopuri() {
      return this.$store.state.desktopuri;
    },
    sellerLaptops() {
      return this.$store.state.laptops.filter(
        (item) => item.idVanzator == this.$store.state.seller.id
      );
    },
    sellerTelefoane() {
      return this.$store.state.telefoane.filter(
        (item) => item.idVanzator == this.$store.state.seller.id
      );
    },
    sellerDesktopuri() {
      return this.$store.state.desktopuri.filter(
        (item) => item.idVanzator == this.$store.state.seller.id
      );
    },
  },

  methods: {
    sortarepret,
    arataLaptopuri() {
      this.showLaptops = !this.showLaptops;
    },
    arataTelefoane() {
      this.showTelefoane = !this.showTelefoane;
    },
    arataDesktopuri() {
      this.showDesktopuri = !this.showDesktopuri;
    },
    arataIteme() {
      this.showItems = !this.showItems;
    },
    logout() {
      this.$store.dispatch("loginuser", false);
      window.localStorage.removeItem("token");
      this.$router.push("/");
    },
    deleteLap(laptop) {
      this.$store.dispatch("deleteLap", laptop);
    },
    deleteTel(telefon) {
      this.$store.dispatch("deleteTel", telefon);
    },
    deleteDes(desktop) {
      this.$store.dispatch("deleteDes", desktop);
    },
  },
};
</script>

<style >
body {
  margin: 0;
  width: 100%;
}
#titlu {
  font-size: 30px;
  color: #d4f0d7;
}

nav {
  background-color: #4c9da1;
}
button {
  height: 35px;
  margin: 0 10px;
}
#btnbtn {
  margin-right: 30px;
  font-size: 20px;
  height: 60px;
  margin-top: 20px;
  background-color: #bee5ca;
  border-radius: 15px;
  border-color: #4c9da1;
  padding: 0px 5px;
  font-size: medium;
}

#sortareCrescatoare,
#sortareDescrescatoare {
  background-color: #4c9da1;
  border-radius: 15px;
  border-color: black;
  padding: 0px 5px;
  font-size: medium;
}

#btnCreate {
  background-color: #bee5ca;
  border-radius: 15px;
  border-color: #4c9da1;
  padding: 0px 5px;
  font-size: medium;
}

button:hover {
  filter: brightness(125%);
}

#divElec {
  display: grid;
  margin-left: 40px;
  grid-template-columns: 3fr 3fr 4fr;
}

#textDivNav {
  display: flex;
  justify-content: space-between;
}

#nav {
  position: fixed;
  top: 0px;
  width: 100%;
}

#hello {
  margin-left: 40px;
  margin-top: 30px;
  color: #d4f0d7;
}

#Logout {
  margin-right: 20px;
  margin-top: 30px;
  background-color: #d4f0d7;
  border-radius: 15px;
  border: none;
  padding: 5px 10px;
  font-size: medium;
}

#btnShowItems {
  background-color: #4c9da1;
  border-radius: 15px;
  border-color: black;
  padding: 0px 5px;
  font-size: medium;
}

#btnCreate {
  margin-top: 20px;
}

#btnsMenu {
  margin-top: 95px;
}

#pProdS {
  font-size: 15px;
  font-weight: bold;
}

#pSort {
  font-size: 15px;
  font-weight: bold;
}
</style>
