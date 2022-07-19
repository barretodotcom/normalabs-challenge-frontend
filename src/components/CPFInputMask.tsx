import React, { Dispatch } from 'react';
import InputMask from 'react-input-mask'

interface iIInput {
    value: string;
    setValue: Dispatch<React.SetStateAction<string>>;
    className: string;
}

export default function CPFInputMask({ value, setValue, className }: iIInput) {
    return (
        <InputMask
            className={className}
            mask="999.999.999-99"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Insira seu CPF"
        >
        </InputMask>
    )
}