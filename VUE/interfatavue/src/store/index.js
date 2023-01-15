import { createStore } from "vuex";

export default createStore({
  state: {
    laptops: [],
    laptop: null,
    telefoane: [],
    telefon: null,
    desktopuri: [],
    desktop: null,
    isAuthenticated: false,
    editedLaptop: null,
    editedTelefon: null,
    editedDesktop: null,
    seller: null,
    data: null,
  },
  getters: {
    laptops: (state) => {
      return state.laptops;
    },
    telefoane: (state) => {
      return state.telefoane;
    },
    desktopuri: (state) => {
      return state.desktopuri;
    },
    editedLaptop: (state) => {
      return state.editedLaptop;
    },
    editedTelefon: (state) => {
      return state.editedTelefon;
    },
    editedDesktop: (state) => {
      return state.editedDesktop;
    },
    laptop: (state) => {
      return state.laptop;
    },
    telefon: (state) => {
      return state.telefon;
    },
    desktop: (state) => {
      return state.desktop;
    },
  },
  mutations: {
    SET_AUTH: (state, status) => {
      state.isAuthenticated = status;
    },
    SET_REGISTER: (state, status) => {
      state.isAuthenticated = status;
    },
    SET_LAPTOPS: (state, laptops) => {
      state.laptops = laptops;
    },
    SET_LAPTOP: (state, laptop) => {
      state.laptop = laptop;
    },
    SET_TELEFOANE: (state, telefoane) => {
      state.telefoane = telefoane;
    },
    SET_TELEFON: (state, telefon) => {
      state.telefon = telefon;
    },
    SET_DESKTOPURI: (state, desktopuri) => {
      state.desktopuri = desktopuri;
    },
    SET_DESKTOP: (state, desktop) => {
      state.desktop = desktop;
    },
    ADD_LAPTOP: (state, laptop) => {
      state.laptops.push(laptop);
    },
    ADD_TELEFON: (state, telefon) => {
      state.telefoane.push(telefon);
    },
    ADD_DESKTOP: (state, desktop) => {
      state.desktopuri.push(desktop);
    },
    DELETE_LAPTOP: (state, laptop) => {
      let index = state.laptops.indexOf(laptop);
      state.laptops.splice(index, 1);
    },
    DELETE_TELEFON: (state, telefon) => {
      let index = state.telefoane.indexOf(telefon);
      state.telefoane.splice(index, 1);
    },
    DELETE_DESKTOP: (state, desktop) => {
      let index = state.desktopuri.indexOf(desktop);
      state.desktopuri.splice(index, 1);
    },
    SET_SELLER: (state, seller) => {
      state.seller = seller;
    },
    EDIT_LAPTOP: (state, laptop) => {
      Object.assign(
        state.laptops[state.laptops.findIndex((elem) => elem.id === laptop.id)],
        laptop
      );
    },
    SET_EDITED_LAPTOP: (state, laptop) => {
      state.editedLaptop = laptop;
    },
    EDIT_TELEFON: (state, telefon) => {
      Object.assign(
        state.telefoane[
          state.telefoane.findIndex((elem) => elem.id === telefon.id)
        ],
        telefon
      );
    },
    SET_EDITED_TELEFON: (state, telefon) => {
      state.editedTelefon = telefon;
    },
    EDIT_DESKTOP: (state, desktop) => {
      Object.assign(
        state.desktopuri[
          state.desktopuri.findIndex((elem) => elem.id === desktop.id)
        ],
        desktop
      );
    },
    SET_EDITED_DESKTOP: (state, desktop) => {
      state.editedDesktop = desktop;
    },
  },
  actions: {
    fetchLaptops: ({ commit }, payload) => {
      commit("SET_LAPTOPS", payload);
    },
    fetchTelefoane: ({ commit }, payload) => {
      commit("SET_TELEFOANE", payload);
    },
    fetchDesktopuri: ({ commit }, payload) => {
      commit("SET_DESKTOPURI", payload);
    },
    setLaptop: ({ commit }, payload) => {
      commit("SET_LAPTOP", payload);
    },
    setTelefon: ({ commit }, payload) => {
      commit("SET_TELEFON", payload);
    },
    setDesktop: ({ commit }, payload) => {
      commit("SET_DESKTOP", payload);
    },
    loginuser: ({ commit }, payload) => {
      commit("SET_AUTH", payload);
    },
    registeruser: ({ commit }, payload) => {
      commit("SET_REGISTER", payload);
    },
    addLaptop: ({ commit }, payload) => {
      commit("ADD_LAPTOP", payload);
    },
    addTelefon: ({ commit }, payload) => {
      commit("ADD_TELEFON", payload);
    },
    addDesktop: ({ commit }, payload) => {
      commit("ADD_DESKTOP", payload);
    },
    logout: ({ commit }, payload) => {
      commit("SET_AUTH", payload);
    },
    deleteLap: ({ commit }, payload) => {
      commit("DELETE_LAPTOP", payload);
    },
    deleteTel: ({ commit }, payload) => {
      commit("DELETE_TELEFON", payload);
    },
    deleteDes: ({ commit }, payload) => {
      commit("DELETE_DESKTOP", payload);
    },
    setSeller: ({ commit }, payload) => {
      commit("SET_SELLER", payload);
    },
    editLaptop: ({ commit }, payload) => {
      commit("EDIT_LAPTOP", payload);
    },
    setNewLaptop: ({ commit }, payload) => {
      commit("SET_EDITED_LAPTOP", payload);
    },
    editTelefon: ({ commit }, payload) => {
      commit("EDIT_TELEFON", payload);
    },
    setNewTelefon: ({ commit }, payload) => {
      commit("SET_EDITED_TELEFON", payload);
    },
    editDesktop: ({ commit }, payload) => {
      commit("EDIT_DESKTOP", payload);
    },
    setNewDesktop: ({ commit }, payload) => {
      commit("SET_EDITED_DESKTOP", payload);
    },
  },
  modules: {},
});
