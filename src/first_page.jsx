import React, {useEffect} from "react"
import {useLocation, useNavigate} from 'react-router'
import styles from './first_page.less'
// import './first_page.less'
// 如果没有配置省略文件后缀，导入时不写后缀回报错
import BaseRoute from "./router/index.jsx"
import { Badge, TabBar, NavBar } from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'

// 底部导航
const Bottom = () => {
  const pathname = useLocation()
  const navigate = useNavigate()
  const handleRouter = (value) => {
    navigate(value)
  }
  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: '/todo',
      title: '我的待办',
      icon: <UnorderedListOutline />,
      badge: '5',
    },
    {
      key: '/message',
      title: '我的消息',
      icon: (active) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: '99+',
    },
    {
      key: '/person',
      title: '个人中心',
      icon: <UserOutline />,
    },
  ]
  return <>
    <TabBar activeKey={pathname.pathname} onChange={(value) => handleRouter(value)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  </>
}


const FirstPage = () => {
  const navigate = useNavigate()
  const pathname = useLocation()
  const goBack = () => {
    navigate(-1)
  }
  
  // 重定向
  useEffect(() => {
    if (pathname.pathname === '/') {
      navigate('/home')
    }
  }, [pathname])
  return <div className={styles.first_app}>
    {/* 页面frame路由区域 */}
    <div className={styles.first_top} style={{color: Theme}}>
      <NavBar onBack={goBack}>app 首页</NavBar>
    </div>
    <div className={styles.first_body}>
      <BaseRoute />
    </div>
    <div className={styles.first_bottom}>
      <Bottom/>
    </div>
  </div>
}

export default FirstPage