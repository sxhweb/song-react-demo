import React, { useEffect } from "react";
import styles from './index.less'

const Home = () => {
  console.log(styles, 'syles')
  useEffect(() => {

  }, [])
  return <div className={styles.home}>
    <h1>Home</h1>
  </div>
}

export default Home