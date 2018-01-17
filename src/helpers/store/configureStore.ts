"use strict";

import createSagaMiddleware, {SagaMiddleware} from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import * as createLogger from "redux-logger";
import loadState from "./loadState";
import saveState from "./saveState";
import {Store} from "react-redux";
import {fromJS} from "immutable";
import {throttle} from "lodash";

export default (rootReducer: any, rootSaga: any, storeKey: string): Store<any> => {

    let store: Store<any>;

    const initialState: any = fromJS(loadState(storeKey));

    const sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware<any>();

    if (process.env.NODE_ENV !== "production") {
        const logger: any = createLogger({
            collapsed: false,
            stateTransformer: state => state.toJS()
        });

        store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware, logger));
    } else {
        store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
    }

    sagaMiddleware.run(rootSaga);

    store.subscribe(throttle(() => {
        saveState(store.getState(), storeKey);
    }, 1000));

    return store;
};
