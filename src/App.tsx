import React from 'react';
import './App.css';
import {MyCounter} from './MyCounter/MyCounter';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './Redux/store';
import {setCurrentAC, setMaxAC, setMinAC} from './Redux/SettingReducer';

function App() {
    // const min = Number(localStorage.getItem('min'))
    // const max = Number(localStorage.getItem('max'))
    // const current = Number(localStorage.getItem('current'))

    const dispatch = useDispatch()
    const minValue = useSelector<AppRootStateType, number>(state => state.settings.min)
    const maxValue = useSelector<AppRootStateType, number>(state => state.settings.max)
    let value = useSelector<AppRootStateType, number>(state => state.settings.currentValue)

    let disableReset = true
    let disableIncr = false
    let error = ''
    //
    // useEffect(()=>{
    //     localStorage.setItem('min', JSON.stringify(minValue))
    //     localStorage.setItem('max', JSON.stringify(maxValue))
    //     localStorage.setItem('current', JSON.stringify(value))
    // },[minValue, maxValue, value])

    if(minValue >= maxValue || value % 1 !== 0 || value < 0){
        disableIncr = true
        disableReset = false
        error = 'Enter valid range'
    }else{
        error = ''
        disableReset = false
    }
    if(value === maxValue){
        disableIncr = true
    }
    if(value === minValue){
        disableReset = true
    }
    if(error){
        disableReset = false
    }

    const settingMINimalValueCallBack = (val: number) => {
            dispatch(setMinAC(val))
            dispatch(setCurrentAC(val))
        if(val > maxValue || val < 0) {
            dispatch(setMinAC(minValue))
        }
    }
    const settingMAXimalValueCallBack = (val: number) => {
        dispatch(setMaxAC(val))
        if(val < minValue) {
            dispatch(setMaxAC(maxValue))
        }
    }
    const onIncrementClick = () => {
        dispatch(setCurrentAC(value += 1))
    }
    const onReset = () => {
        dispatch(setMinAC(minValue))
        dispatch(setMaxAC(maxValue))
        dispatch(setCurrentAC(minValue))
    }

    return (
        <div className="App">
            <MyCounter activateReset={onReset}
                       callBackIncr={onIncrementClick}
                       value={value}
                       disableIncr={disableIncr}
                       disableReset={disableReset}
                       settingMAXimalValueCallBack={settingMAXimalValueCallBack}
                       settingMINimalValueCallBack={settingMINimalValueCallBack}
                       maxValue={maxValue}
                       minValue={minValue}
                       error={error}/>
        </div>
    );
}

export default App;
