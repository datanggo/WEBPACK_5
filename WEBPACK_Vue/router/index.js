import { createRouter, createWebHashHistory } from "vue-router"

// 路由懒加载
const Home = () => import('../views/Home')
const About = () => import('../views/About')

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: "/about",
            component: About
        },
        //重定向
        { path: '/', redirect: '/home' }
    ]
})