import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
import axios from 'axios'
Vue.use(Vuex)

const http = axios.create({
  baseURL: 'http://localhost:9001/api'

})

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user
  },
  getters,
  state: {
    http,
    langs: []
  }
})

export default store
