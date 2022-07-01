import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type InputPropsType = DefaultInputPropsType & {
    error: string
}
export const Input: React.FC<InputPropsType> = ({error, ...rest}) => {

    return (
        <input {...rest.onChange} {...rest}/>
    );
};
