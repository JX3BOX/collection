import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = {
    state: {
        sidebar: {
            tag: null,
        }
    },
    mutations: {},
    getters: {},
    actions: {},
    modules: {}
};

export default new Vuex.Store(store);
