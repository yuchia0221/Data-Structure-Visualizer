import React from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./component/Main";
import SortingVisualizer from "./component/SortingVisualizer";
import DataStructureVisualizer from "./component/DataStructureVisualizer";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import SubscribeBox from "./component/EmailService/SubscribeBox";
import UnsubscribeBox from "./component/EmailService/UnsubscribeBox";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route path="/sorting" component={SortingVisualizer} />
                <Route path="/data-structure" component={DataStructureVisualizer} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/subscribe" component={SubscribeBox} />
                <Route path="/unsubscribe" component={UnsubscribeBox} />
            </Switch>
        </Router>
    );
}

export default App;
