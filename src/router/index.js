import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '~/views/layout/layout'

export const RouterMap = [
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        name:'root',
        children: [
            {
                path: 'dashboard',
                component: () => import('~/views/dashboard'),
                name: 'dashboard',
                icon:'el-icon-fa-dashboard',
                cname:'首页'
            }
        ]
    },
    {
        path: '/industry',
        component: Layout,
        redirect: '/industry/overview',
        name:'industry',
        cname: '全品类分析',
        single:true,
        children: [
            {
                path: 'overview',
                component: () => import('~/views/analysis/industry'),
                cname: '全品类分析',
                name: 'industry-overview',
                icon:'el-icon-fa-industry',
            }
        ]
    },
    {
        path: '/competitor',
        component: Layout,
        redirect: '/competitor/overview',
        name:'competitor',
        cname: "竞品分析",
        icon:'el-icon-fa-cubes',
        children: [
            {
                path: 'overview',
                component: () => import('~/views/analysis/competitor'),
                cname: '竞品总览',
                name: 'competitor-overview',
                icon:'el-icon-fa-line-chart',
            },
            {
                path: 'comp/:param',
                component: () => import('~/views/analysis/comp'),
                cname: 'dynamic',
                name: 'dynamic',
                icon:'el-icon-fa-cube',
                dynamic:true,
            },            
            // {
            //     path: 'babycare',
            //     component: () => import('~/views/analysis/comp'),
            //     cname: 'babycare',
            //     name: 'babycare',
            //     icon:'el-icon-fa-cube',
            // },
            // {
            //     path: 'bobo',
            //     component: () => import('~/views/analysis/comp'),
            //     cname: 'bobo',
            //     name: 'bobo',
            //     icon:'el-icon-fa-cube',
            // },
            // {
            //     path: 'nuk',
            //     component: () => import('~/views/analysis/comp'),
            //     cname: 'nuk',
            //     name: 'nuk',
            //     icon:'el-icon-fa-cube',
            // },
            // {
            //     path: 'pigeon',
            //     component: () => import('~/views/analysis/comp'),
            //     cname: '贝亲',
            //     name: 'pigeon',
            //     icon:'el-icon-fa-cube',
            // },
            // {
            //     path: 'drbrowns',
            //     component: () => import('~/views/analysis/comp'),
            //     cname: '布朗博士',
            //     name: 'drbrowns',
            //     icon:'el-icon-fa-cube',
            // },
            // {
            //     path: 'avent',
            //     component: () => import('~/views/analysis/comp'),
            //     cname: '新安怡',
            //     name: 'avent',
            //     icon:'el-icon-fa-cube',
            // }                
        ]
    },
    {
        path: '/out',
        component: Layout,
        // redirect: '/out/data',
        name:'out',
        cname: "出库数据",
        // single:true,
        icon:'el-icon-fa-cubes',
        children: [
            {
                path: 'jd',
                component: () => import('~/views/analysis/out'),
                cname: '京东',
                icon:'el-icon-fa-cube',
                name: 'out-jd',
            },
            {
                path: 'tb',
                component: () => import('~/views/analysis/out'),
                cname: '淘宝',
                icon:'el-icon-fa-cube',
                name: 'out-tb',
            }                       
        ]
    },    
    {
        path: '/system',
        component: Layout,
        redirect: '/system/data',
        name:'system',
        cname: "系统管理",
        // single:true,
        icon:'el-icon-fa-cogs',
        children: [
            {
                path: 'data',
                component: () => import('~/views/data/management'),
                cname: '数据管理',
                icon:'el-icon-fa-database',
                name: 'system-data',
            },
            {
                path: 'comp',
                component: () => import('~/views/system/compset'),
                cname: '竞品管理',
                icon:'el-icon-fa-eye',
                name: 'system-comp',
            }            
        ]
    },          
    {
        path: '/login',
        name:'login',
        cname: "登陆",        
        hidden: true,
        component: () => import('~/views/data/management'),
    },
    {
        path: '/register',
        name:'register',
        cname: "注册",         
        hidden: true,
        component: () => import('~/views/data/management'),
    },
    // {
    //     path: '/index',
    //     component: Layout,
    // },
]

export default new Router({
    // mode: 'history', // require service support
    base: __dirname,
    saveScrollPosition: true,
    scrollBehavior: function (to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
    routes: RouterMap
})