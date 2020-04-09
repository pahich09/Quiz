import React, {Component} from "react"
import {Redirect} from "react-router-dom";
import {logOut} from "../../store/actions/auth";
import {connect} from "react-redux";

class Logout extends Component{
    componentDidMount() {
        this.props.logOut()
    }
    render() {
        return <Redirect to={'/'}/>
    }
}
export default connect(null, {logOut})(Logout)