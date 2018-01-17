import {IndexRoute, Route} from "react-router";
import NotFound from "components/NotFound";
import * as Pages from "../pages";
import {Store} from "react-redux";
import * as React from "react";

export default (store) => {

    return (
        <Route path="/" component={Pages.Layout}>
            <IndexRoute component={Pages.Home}/>
            <Route path="*" component={NotFound}/>
        </Route>
    );
};
