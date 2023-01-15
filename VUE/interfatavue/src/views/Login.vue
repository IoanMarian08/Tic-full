<template>
  <div>
    <p id="pLogin"><strong>Login</strong></p>
    <div id="pDiv">
      <p id="pMesaj">
        Te rugăm să te autentifici cu email-ul și parola dumneavoastră!
      </p>
    </div>
    <form @submit.prevent="userLogin">
      <div id="emailDiv">
        <input
          v-model="state.email"
          type="email"
          placeholder="EMAIL"
          id="email"
        />
      </div>
      <div id="passDiv">
        <input
          v-model="state.password"
          type="password"
          placeholder="PAROLA"
          id="password"
        />
      </div>
      <div id="btnDiv">
        <button @click="userLogin">Logare</button>
      </div>

      <div id="mesajDiv">
        {{ state.mesaj }}
      </div>
    </form>
  </div>
</template>

<script>
import utils from "../utils.js";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      email: "",
      password: "",
      mesaj: "",
    });

    function userLogin() {
      let data = {
        email: state.email,
        password: state.password,
      };
      let requestParameters = utils.globalRequestParameters;
      requestParameters.method = "POST";
      requestParameters.body = JSON.stringify(data);
      fetch(utils.url + "login", requestParameters).then((res) => {
        res.json().then((res) => {
          console.log(res);
          this.mesaj = res.mesaj;
          if (res.token) {
            console.log(res.token);
            localStorage.setItem("token", res.token);
            store.dispatch("setSeller", res.seller);
          }
          router.push({
            path: "/meniu",
          });
        });
      });
      return;
    }
    return {
      userLogin,
      state,
    };
  },
};
</script>

<style scoped>
#email {
  padding: 1%;
  width: 230px;
}

#password {
  padding: 1%;
  width: 230px;
}

#emailDiv {
  margin-bottom: 2%;
}

#passDiv {
  margin-bottom: 2%;
}

button {
  background-color: #41b783;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  width: 200px;
  margin-left: -5px;
}

#btnDiv {
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  align-items: center;
}

button:hover {
  filter: brightness(125%);
}

#pLogin {
  font-size: 50px;
}

#pMesaj {
  font-size: 20px;
}
</style>
