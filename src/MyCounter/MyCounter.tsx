import React, {ChangeEvent, useState} from 'react';
import s from '../components/MainFrame/MainFrame.module.css';
import CountingLabel from '../components/CountingLabel/CountingLabel';
import Button from '../components/Button/Button';
import {Input} from '../components/Input/Input';

type MyCounterPropsType = {
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
export const MyCounter: React.FC<MyCounterPropsType> = ({
                                                            activateReset,
                                                            disableReset,
                                                            disableIncr,
                                                            settingMINimalValueCallBack,
                                                            settingMAXimalValueCallBack,
                                                            maxValue,
                                                            minValue,
                                                            value,
                                                            callBackIncr,
                                                            error
                                                        }) => {

    const [edit, setEdit] = useState(true)

    const minCallBack = (e: ChangeEvent<HTMLInputElement>) => {
        settingMINimalValueCallBack(Number(e.currentTarget.value))
    }
    const maxCallBack = (e: ChangeEvent<HTMLInputElement>) => {
        settingMAXimalValueCallBack(Number(e.currentTarget.value))
    }
    const gotItOnClickHandler = () => {
        settingMINimalValueCallBack(minValue)
        settingMAXimalValueCallBack(maxValue)
        setEdit(false)
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
                                <Button onClick={() => setEdit(true)}>Settings</Button>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};
