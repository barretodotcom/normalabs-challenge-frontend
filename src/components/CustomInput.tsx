import React, { Dispatch } from "react";
import './CustomInput.css'

interface ICustomInput {
    label: string;
    value: any;
    placeholder?: string;
    setValue: Dispatch<React.SetStateAction<any>>;
    type: string;
}

export default function CustomInput({ label, value, placeholder, type, setValue }: ICustomInput) {

    return (
        <div className="custom-input-container">
            <p style={{ fontWeight: 500 }} className="poppins">{label}</p>
            <input className="custom-input" placeholder={placeholder} type={type} value={value} onChange={e => setValue(e.target.value)} />
        </div>
    )
}