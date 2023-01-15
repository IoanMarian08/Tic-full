<template>
  <div>
    <p id="pLogin"><strong>Register</strong></p>
    <div id="pDiv">
      <p id="pMesaj">
        Te rugăm să completezi următoarele câmpuri pentru a vă putea crea un
        cont și a acces aplicația!
      </p>
    </div>
    <form @submit.prevent="userRegister">
      <div id="numeDiv">
        <input v-model="nume" type="Nume" placeholder="NUME" id="nume" />
      </div>
      <div id="usernameDiv">
        <input
          v-model="username"
          type="Username"
          placeholder="USERNAME"
          id="username"
        />
      </div>
      <div id="emailDiv">
        <input v-model="email" type="email" placeholder="EMAIL" id="email" />
      </div>
      <div id="passDiv">
        <input
          v-model="password"
          type="password"
          placeholder="PAROLA"
          id="password"
        />
      </div>
      <div id="btnDiv">
        <router-link to="/meniu">
          <button @click="userRegister">Register</button>
        </router-link>
      </div>

      <div>
        {{ mesaj }}
      </div>
    </form>
  </div>
</template>

<script>
import utils from "../utils.js";

export default {
  name: "Register",
  data() {
    return {
      nume: "",
      username: "",
      email: "",
      password: "",
      mesaj: "",
    };
  },
  methods: {
    userRegister() {
      let data = {
        nume: this.nume,
        username: this.username,
        email: this.email,
        password: this.password,
      };
      let requestParameters = utils.globalRequestParameters;
      requestParameters.method = "POST";
      requestParameters.headers.Authorization = "Bearer " + localStorage.token;
      requestParameters.body = JSON.stringify(data);
      this.$store.dispatch("registeruser", data);
      fetch(utils.url + "register", requestParameters).then((res) => {
        res.text().then((res) => {
          this.mesaj = res;
          this.$router.push({
            path: "/meniu",
          });
        });
      });
    },
  },
};
</script>

<style scoped>
#nume {
  padding: 1%;
  width: 230px;
}

#numeDiv {
  margin-bottom: 2%;
}

#btnDiv {
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  align-items: center;
}

#username {
  padding: 1%;
  width: 230px;
}

#usernameDiv {
  margin-bottom: 2%;
}

#email {
  padding: 1%;
  width: 230px;
}

#emailDiv {
  margin-bottom: 2%;
}

#password {
  padding: 1%;
  width: 230px;
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
