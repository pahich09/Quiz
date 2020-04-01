import React, { Component } from "react";
import Layout from "./hoc/Layout";
import Quiz from "./containers/Quiz";
import {Route, Switch} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";

class App extends Component {


  render() {
    return (
      <Layout>
        <Switch>
          <Route path={'/auth'} render={()=><Auth/>}/>
          <Route path={'/quiz-creator'} render = {()=><QuizCreator/>}/>
          <Route path={'/quiz/:id'} render={()=><Quiz/>}/>
          <Route path={'/'} render ={()=><QuizList/>}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
