const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  errorLogs: state => state.errorLog.logs,
  getProject: (state, getters) => (_this) => {
    return new Promise((resolve, reject) => {
      if (state.project) {
        resolve(state.project)
      }
      state.http.get('/Project/getProjects').then(response => {
        state.project = response.data.result
        resolve(state.project)
      }, err => {
        getters.errorParse(err, _this)
      })
    })
  },
  getAllLangs: (state, getters) => (_this) => {
    return new Promise(resolve => {
      if (state.langs.length > 0) {
        resolve(state.langs)
      }
      state.http.get('/language/getAll').then(response => {
        state.langs = response.data.result
        resolve(state.langs)
      }, err => {
        getters.errorParse(err, _this)
      })
    })
  },
  errorParse: state => (err, _this) => {
    console.log(err)
  },
  convertValue: state => (value, type) => {
    switch (type) {
      case 'Int32':
      case 'Int64':
      case 'Double':
        {
          return Number(value)
        } break
      default : {
        return value
      } break
    }
  }
}
export default getters
