import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "antd/dist/antd.css";
import "./icons.css";
import ScrollToTop from "./utils/scrollToTop";
import { Spin } from "antd";
import PlayerSelection from "./pages/PlayerSelection/PlayerSelection";
import BetPage from "./pages/BetPage/BetPage";

const history = createBrowserHistory();

function App() {
    return (
        <Suspense fallback={<Spin />}>
            <Switch history={history}>
                <Route path={`${process.env.PUBLIC_URL}/`} exact component={PlayerSelection} />

                <Route
                    path={`${process.env.PUBLIC_URL}/betpage`}
                    exact
                    render={(props) => <BetPage {...props} />}
                />
            </Switch>
        </Suspense>
    );
}

ReactDOM.render(
    <Router>
        <ScrollToTop />
        <App />
    </Router>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
