import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = {
    state: {
        sidebar: {
            tag: null,
        },
        my_collections : null,
        my_collections_total : 0,
        client: location.href.includes("origin") ? "origin" : "std",
    },
    mutations: {},
    getters: {},
    actions: {},
    modules: {}
};

export default new Vuex.Store(store);
