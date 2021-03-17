import {rootReducer} from './reduces';
import {createStore, Store, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import { composeWithDevTools} from 'redux-devtools-extension';

const reduxPersistConfig = {
    key:'application',
    storage: storage,
    stateReconciler: autoMergeLevel2
};

//const pReducer = persistReducer(reduxPersistConfig, rootReducer);
export const store = createStore(
            rootReducer,
            composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);