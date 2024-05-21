import React, { lazy, Suspense } from 'react'
import { Route, Link, Routes, Redirect } from 'react-router-dom'

import { Button } from 'antd'

// import Home from "./pages/Home"
// import About from "./pages/About"

// 路由懒加载                   ///* webpackChunkName:"home" */魔法命名
const Home = lazy(() => import(/* webpackChunkName:"home" */'./pages/Home'))
const About = lazy(() => import('./pages/About'))

export default function App() {
    return (
        <div>
            App
            <Button type="primary">按钮</Button>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            <Suspense fallback={<div>loading。。。。</div>}>
                <Routes>
                    <Route path='/home' element={<Home></Home>}></Route>
                    <Route path='/about' element={<About></About>}></Route>
                </Routes>
            </Suspense>
        </div>

    )
}
