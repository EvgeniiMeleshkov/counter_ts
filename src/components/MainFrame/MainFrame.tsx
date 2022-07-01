import React, {ChangeEvent, useEffect} from 'react';
import CountingLabel from '../CountingLabel/CountingLabel';
import Button from '../Button/Button';
import s from './MainFrame.module.css'
import {Input} from '../Input/Input';


type MainFramePropsType = {
    activateReset: () => void
    callBackIncr: () => void
    value: number
    disableIncr: boolean
    disableReset: boolean
    settingMAXimalValueCallBack: (val: number) => void
    settingMINimalValueCallBack: (val: number) => void
    maxValue: number
    minValue: number
    error: string
}

const MainFrame = ({
                       error,
                       disableIncr,
                       disableReset,
                       value,
                       maxValue,
                       callBackIncr,
                       activateReset,
                       minValue,
                       settingMINimalValueCallBack,
                       settingMAXimalValueCallBack,
                   }: MainFramePropsType) => {


    const minCallBack = (e: ChangeEvent<HTMLInputElement>) => {
        settingMINimalValueCallBack(Number(e.currentTarget.value))
    }
    const maxCallBack = (e: ChangeEvent<HTMLInputElement>) => {
        settingMAXimalValueCallBack(Number(e.currentTarget.value))
    }

    return (
        <div className="App-header">
            <div className={s.main}>

                <div className={s.labelDiv}>
                    <CountingLabel error={error} maxValue={maxValue} value={value}/>
                </div>

                <div className={s.buttonsDiv}>
                    <Button onClick={callBackIncr} disabled={disableIncr}>Inc</Button>
                    <Input error={error} value={minValue} onChange={minCallBack} className={s.inputMinMax} type='number'/>
                    <Input error={error} value={maxValue} onChange={maxCallBack} className={s.inputMinMax} type='number'/>
                    <Button red={!!error} onClick={activateReset} disabled={disableReset}>Reset</Button>
                </div>

            </div>
        </div>
    );
};

export default MainFrame;
