import NavBar from './navBar'
import NavBarLink from './navBarLink'
import React from "react";
import ReactDOM from "react-dom";

const NavBarItem = ({url, text, submenu}) => {
  const generateLink = () => (
    <NavBarLink url={url} text ={text}/>
  )
  const generateSubmenu = () => (
    <NavBar items={submenu}/>
  )
  const generateContent = () => {
    var content = [generateLink()]
    if(submenu){
      content.push(generateSubmenu())
    }
    return content
  }
  
  var content = generateContent()
  return (
    <li>
      {content}
    </li>
  )
}

export default NavBarItem
