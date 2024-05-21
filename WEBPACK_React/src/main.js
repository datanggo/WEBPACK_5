import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from 'react-router-dom'
import App from "./App"

// 引入antd所有样式文件
import "andt/dist/antd.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <BrowserRouter>
        <App></App>
    </BrowserRouter>
)