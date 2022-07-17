// 用户模块
export default {
  namespaced: true,
  state () {
    // 模块中的state要写成函数模式，类似于组件中的data
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    setUser (state, payload) {
      // 修改用户信息，payload(有效载荷)就是用户信息对象
      state.profile = payload
    }
  }
}
