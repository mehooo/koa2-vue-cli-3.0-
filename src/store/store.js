import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import { login, getUserInfo } from '@/assets/api/login';
import { getToken, setToken } from '@/assets/utils/auth';
import { asyncRouterMap, constantRouterMap } from '@/routers/router.js'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    });
    return accessedRouters
}

const store = new Vuex.Store({
    state: {
        token: getToken('userToken'),
        username: '',
        avatar: '',
        roles: [],
        addRouters: [],
        routers: constantRouterMap,
        sidebar: {
            opened: false,
        },
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USERINFO: (state, userInfo) => {
            state.username = userInfo.username;
            state.avatar = userInfo.avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        },
        TOGGLE_SIDEBAR: state => {
            state.sidebar.opened = !state.sidebar.opened;
        },
    },
    getters: {
        token: (state) => {
            return state.token;
        },
        roles:(state) => {
            return state.roles;
        },
        routers:(state) => {
            return state.routers;
        },
        addRouters:(state) => {
            return state.addRouters;
        },
        sidebar:(state) => {
            return state.sidebar;
        }
    },
    actions: {
        //登录获取获取token
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                login(username, userInfo.password).then(response => {
                    let data = response.data;
                    console.log('data---', data);
                    setToken('userToken', data.token);
                    commit('SET_TOKEN', data.token);
                    resolve()
                })
            })
        },
        //通过token获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(response => {
                    let data = response.data;
                    // 验证返回的roles是否是一个非空数组
                    if (data.roles && data.roles.length > 0) {
                        commit('SET_ROLES', data.roles)
                    } else {
                        reject('getUserInfo: roles must be a non-null array !')
                    }
                    commit('SET_USERINFO', data);
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //根据用户信息的角色生成所属路由
        GenerateRoutes({commit}, data){
            return new Promise(resolve => {
                let { roles } = data;
                let accessedRouters;
                if (roles.indexOf('admin') >= 0) {
                    // console.log('超级管理员，全部路由都有权限');
                    accessedRouters = asyncRouterMap
                } else {
                    // console.log('非超级管理员，则需要通过方法过滤动态路由');
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }
                commit('SET_ROUTERS', accessedRouters);
                resolve()
            })
        },
        //左侧菜单
        ToggleSideBar({commit}){
            commit('TOGGLE_SIDEBAR')
        }
    }
});
export default store


