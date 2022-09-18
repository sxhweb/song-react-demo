import React from "react";
import ReactDom from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import FirstPage from "./first_page";

console.log(Theme, 'theme')

const App = () => {
  return <div>
    <FirstPage/>
  </div>
}

ReactDom.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('app')
)