import {combineReducers, createStore, legacy_createStore} from 'redux';
import {EditReducer} from './editReducer';
import {SettingReducer} from './SettingReducer';
import {loadState} from '../localStorage';

export const rootReducer = combineReducers({
    settings: SettingReducer,
    edition: EditReducer
})
const persistedState = loadState()

export const store = legacy_createStore(rootReducer, persistedState);
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;