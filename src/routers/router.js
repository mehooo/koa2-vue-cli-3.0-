import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import { Message } from 'element-ui'
import {getToken} from '@/assets/utils/auth';
import store from '@/store/store';
import Layout from 'pages/layout/Index.vue';

const _import =  path => () => import(`pages/${path}.vue`);

export const constantRouterMap = [
    {
        path: '/',
        hidden: true,
        component: Layout,
        redirect: '/dashboard',
        meta: { requiresAuth: true },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        meta: { title: 'Dashboard', icon: 'menu'},
        component: Layout,
        children: [
            {
                path: '',
                meta: { title: 'Dashboard', icon: 'menu' },
                component: _import('dashboard/Index')
            },
        ]
    }, {
        path: '/user',
        name: 'user',
        meta: { title: 'User', icon: 'tickets' },
        component: Layout,
        children: [
            {
                path: '',
                meta: { title: 'user', icon: 'tickets' },
                component: _import('user/Index'),
            },
        ]
    },
    {
        path: '/login',
        hidden: true,
        component:_import('login/Index'),
    }, {
        path: '*',
        hidden: true,
        redirect: '/login'
    }
];


export const asyncRouterMap = [
    {
        path: '/set',
        name:'set',
        meta: { title: 'set', icon: 'setting', roles: ['admin'] },
        component: Layout,
        children: [
            {
                path: '',
                meta: { title: 'set', icon: 'setting' },
                component: _import('set/Index'),
            },
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
];

const router = new VueRouter({
    routes:constantRouterMap
});

router.beforeEach((to, from, next) => {
    //这里通过获取本地保存的token来判断是否已经登录，页面关闭时会清空token
    if (getToken('userToken')) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            // console.log(store.getters.roles);
            if (store.getters.roles.length === 0) {
                //通过token调用接口获取用户信息
                store.dispatch('GetInfo').then(res => {
                    let roles = res.roles;
                    //获取用户角色生成所属路由
                    store.dispatch('GenerateRoutes', { roles }).then(()=>{
                        // 动态添加可访问路由表
                        router.addRoutes(store.getters.addRouters);
                        // console.log('router--', router);
                        next(to.path);
                    }).catch(err => {
                        Message.error('验证失败,请重新登录'+ err);
                        next({ path: '/login' })
                    })
                });
            }else {
                // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
                next()
            }
        }
    } else {
        //如果是登录页面路径，就直接next()
        if(to.path ==='/login'){
            next();
        }else{
            //不然就跳转到登录；
            next('/login');
        }
    }
});
export default router;

