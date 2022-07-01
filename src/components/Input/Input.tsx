import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from './Input.module.css'


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type InputPropsType = DefaultInputPropsType & {
    error: string
}
export const Input: React.FC<InputPropsType> = ({error, ...rest}) => {
    return (
        <input className={error ? s.errorInput : s.superInput} {...rest.onChange} {...rest}></input>
    );
};
