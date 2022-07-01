import React from 'react';
import s from './CountingLabel.module.css'


type CountingLabelPropsType = {
    value: number
    maxValue: number
    error: string
}

const CountingLabel = ({value, error, maxValue}: CountingLabelPropsType) => {
    //console.log('CountingLabel rendered')
    return (
        <div>
            { error === ''
               ? <p className={value === maxValue ? s.limit : s.label}>{value}</p>
               : <p className={s.error}>{error}</p>
            }
        </div>
    );
};

export default CountingLabel;