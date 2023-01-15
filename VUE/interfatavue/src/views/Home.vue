<template>
  <div class="home">
    <div>
      <img id="imgHome" alt="Vue logo" src="../assets/logoaplicatie.png" />
    </div>
    <div>
      <p id="idPara">Bine ai venit pe E-lectron Components</p>
    </div>
    <div className="btnHome">
      <router-link to="/register">
        <button id="registerbtn">Register</button>
      </router-link>
      <router-link to="/login">
        <button id="loginbtn">Login</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
* {
  margin: 0;
}
button {
  background-color: #41b783;
  border: none;
  border-radius: 5px;
  padding: 10px 40px;
  font-size: 16px;
  cursor: pointer;
  width: 200px;
  height: 60px;
}

button:hover {
  filter: brightness(125%);
}

#imgHome {
  width: 22%;
  margin-left: 40px;
}

.btnHome {
  display: flex;
  flex-direction: column;
  margin: 30px auto;
}

#accesAppBtn, #loginbtn, #registerbtn {
  margin-top: 10px;
}

#idPara {
  font-size: 40px;
  margin: 20px auto;
}
</style>
