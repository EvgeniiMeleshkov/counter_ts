import React, {useEffect, useState} from 'react';
import './App.css';
import MainFrame from './components/MainFrame/MainFrame';

function App() {
    const min = Number(localStorage.getItem('min'))
    const max = Number(localStorage.getItem('max'))

    const [minValue, setMinValue] = useState(min)
    const [maxValue, setMaxValue] = useState(max)
    const [value, setValue] = useState(minValue)
    let disableReset = true
    let disableIncr = false
    let error = ''

    useEffect(()=>{
        localStorage.setItem('min', JSON.stringify(minValue))
        localStorage.setItem('max', JSON.stringify(maxValue))
    },[minValue, maxValue])

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
            setMinValue(val)
            setValue(val)
        if(val > maxValue || val < -1) {
            setMinValue(minValue)
        }
    }
    const settingMAXimalValueCallBack = (val: number) => {
        setMaxValue(val)
        if(val < minValue) {
            setMaxValue(maxValue)
        }
    }
    const onIncrementClick = () => {
        setValue(value + 1)
    }
    const onReset = () => {
        setMinValue(minValue)
        setMaxValue(maxValue)
        setValue(minValue)
    }
    // useEffect(()=>{
    //     localStorage.setItem('min', JSON.stringify(minValue));
    //     localStorage.setItem('max', JSON.stringify(maxValue));
    // }, [minValue, maxValue])
    // useEffect(()=>{
    //     const min = localStorage.getItem('min')
    //     const max = localStorage.getItem('max')
    //     min && setMinValue(JSON.parse(min))
    //     max && setMaxValue(JSON.parse(max))
    // })

    return (
        <div className="App">
            <MainFrame
                error={error}
                minValue={minValue}
                maxValue={maxValue}
                settingMINimalValueCallBack={settingMINimalValueCallBack}
                settingMAXimalValueCallBack={settingMAXimalValueCallBack}
                activateReset={onReset}
                callBackIncr={onIncrementClick}
                disableReset={disableReset}
                disableIncr={disableIncr}
                value={value}/>
        </div>
    );
}

export default App;
