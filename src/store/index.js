import Vue from 'vue'
import Vuex from 'vuex'
import { boardStore } from './board.store.js'
import { userStore } from './user.store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    boardStore,
    userStore,
  }
})
