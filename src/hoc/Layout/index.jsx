import React from "react";
import { Component } from "react";
import styles from "./style.module.css";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends Component {
  state={
    menuOpen: false
  }
  toggleHandler=()=>{
    this.setState((prevState)=>({
      menuOpen: !prevState.menuOpen
    }))
  }

  render() {
    return (
      <div className={styles.Layout}>
        <Drawer isOpen={this.state.menuOpen} onClose={this.toggleHandler}/>
        <MenuToggle onToggle={this.toggleHandler}  isOpen={this.state.menuOpen}/>
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
