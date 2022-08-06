import React, {ChangeEvent} from 'react';
import s from '../components/MainFrame/MainFrame.module.css';
import CountingLabel from '../components/CountingLabel/CountingLabel';
import Button from '../components/Button/Button';
import {Input} from '../components/Input/Input';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../Redux/store';
import {editAC} from '../Redux/editReducer';
import {setCurrentAC, setMaxAC, setMinAC} from '../Redux/SettingReducer';
//
// type MyCounterPropsType = {
//     disableIncr: boolean
//     disableReset: boolean
//     settingMAXimalValueCallBack: (val: number) => void
//     settingMINimalValueCallBack: (val: number) => void
//     error: string
// }
export const MyCounter: React.FC = () => {


    const minValue = useSelector<AppRootStateType, number>(state => state.settings.min)
    const maxValue = useSelector<AppRootStateType, number>(state => state.settings.max)
    let value = useSelector<AppRootStateType, number>(state => state.settings.currentValue)
    const edit = useSelector<AppRootStateType, boolean>(state => state.edition.edit)
    const dispatch = useDispatch()

    let disableReset
    let disableIncr
    let error


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

    const callBackIncr = () => {
        dispatch(setCurrentAC(value += 1))
    }
    const activateReset = () => {
        dispatch(setMinAC(minValue))
        dispatch(setMaxAC(maxValue))
        dispatch(setCurrentAC(minValue))
    }

    const minCallBack = (e: ChangeEvent<HTMLInputElement>) => {
        settingMINimalValueCallBack(Number(e.currentTarget.value))
    }
    const maxCallBack = (e: ChangeEvent<HTMLInputElement>) => {
        settingMAXimalValueCallBack(Number(e.currentTarget.value))
    }
    const gotItOnClickHandler = () => {
        settingMINimalValueCallBack(minValue)
        settingMAXimalValueCallBack(maxValue)
        dispatch(editAC(false))
    }
    return (
        <div>
            <div className="App-header">
                <div className={s.main}>
                    <div className={s.labelDiv}>
                        {edit
                            ? <div className={s.settings}>
                                <div className={s.minMaxSettings}>
                                    <p>Set Max: </p><Input error={error} value={maxValue}
                                                           onChange={maxCallBack}
                                                           type="number"/>
                                </div>
                                <div className={s.minMaxSettings}>
                                    <p>Set Min: </p><Input error={error} value={minValue}
                                                           onChange={minCallBack}
                                                           type="number"/>
                                </div>
                            </div>
                            : <div>
                                <CountingLabel error={error} maxValue={maxValue} value={value}/>
                            </div>
                        }
                    </div>
                    <div className={s.buttonsDiv}>
                        {edit
                            ? <Button onClick={gotItOnClickHandler}>Got it!</Button>
                            :<div>
                                <Button onClick={callBackIncr} disabled={disableIncr}>Inc</Button>

                                <Button red={!!error} onClick={activateReset} disabled={disableReset}>Reset</Button>
                                <Button onClick={() => dispatch(editAC(true))}>Settings</Button>
                            </div>}
                    </div>

                </div>
            </div>
        </div>
    );
};
