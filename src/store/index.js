import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'
// vue2.0 new Vuex.Store({})
export default createStore({
  modules: {
    user,
    cart,
    category
  },
  plugins: [createPersistedState({
    key: 'eshop-pc-store', // 本地存储名字
    paths: ['user', 'cart'] // 指定需要存储的模块
  })] // 默认存储在localStorage
})
