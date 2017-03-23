import React from "react";
import ReactDOM from "react-dom";

// var NavBarLink = React.createClass({
//   render: function() {
//     return (
//       <a href={this.props.url}>{this.props.text}</a>
//     );
//   }
// })

const NavBarLink = ({url, text}) => (
  <a href={url}>{text}</a>
)

export default NavBarLink
