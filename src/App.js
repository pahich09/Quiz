import React, {Component} from "react";
import Layout from "./hoc/Layout";
import Quiz from "./containers/Quiz";
import {Redirect, Route, Switch} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

class App extends Component {
    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
        let routes = this.props.isAuth
            ?
            <Switch>
                <Route path={'/quiz-creator'} render={() => <QuizCreator/>}/>
                <Route path={'/quiz/:id'} render={() => <Quiz/>}/>
                <Route path={'/logout'} render={() => <Logout/>}/>
                <Route path={'/'} render={() => <QuizList/>} exact/>
                <Redirect to={'/'}/>
            </Switch>
            :
            <Switch>
                <Route path={'/auth'} render={() => <Auth/>}/>
                <Route path={'/quiz/:id'} render={() => <Quiz/>}/>
                <Route path={'/'} render={() => <QuizList/>} exact/>
                <Redirect to={'/'}/>
            </Switch>

        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    isAuth: !!state.auth.token
})

export default connect(mapStateToProps, {autoLogin})(App);
