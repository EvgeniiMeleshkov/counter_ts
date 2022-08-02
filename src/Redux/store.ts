import {combineReducers, legacy_createStore} from 'redux';
import {EditReducer} from './editReducer';
import {SettingReducer} from './SettingReducer';

const rootReducer = combineReducers({
    settings: SettingReducer,
    edition: EditReducer
})

export const store = legacy_createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;