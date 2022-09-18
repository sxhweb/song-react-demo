import React, { Children } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import route from './route.js'

const BaseRoute = () => {
  const RoutePage = () => {
    const arr = route.map((item, index) => {
      // element接收dom类型组件
      // <Route
      //     key={index}
      //     path={route.path}
      //     render={(props) => {
      //       return getRouteContent(props, route)
      //     }}
      //   />
      // < 括号会自动执行组件函数，返回return的组件
      return <Route path={item.path} element={<item.component/>} key={index}></Route>
      // return <Route path={item.path} element={item.component()} key={index}></Route>
    })
    return arr
  }
  return <>
    {/* {Children} */}
    <Routes>
      {RoutePage()}
    </Routes>
  </>
}

export default BaseRoute

