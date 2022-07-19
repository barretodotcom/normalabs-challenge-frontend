import './Owner.css'
import { useContext, useState } from "react";
import CustomInput from "../components/CustomInput";
import { AuthContext } from '../context/authContext';

export default function Owner() {
    const { createOwner, signInOwner } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    async function handleLogin() {
        await signInOwner({ email, password });
    }

    async function handleCreateAccount() {
        await createOwner({ newEmail, newPassword });
    }

    return (
        <div className="owner-container">
            <div className='owner-container-main-box'>
                <div>
                    <p className='owner-container-main-box-title poppins'>Faça seu login</p>
                    <CustomInput value={email} setValue={setEmail} label="E-mail" type="email" />
                    <CustomInput value={password} setValue={setPassword} label="Senha" type="password" />
                    <button onClick={handleLogin} className='owner-button pointer owner-button-login'>Login</button>
                </div>
            </div>
            <div className='owner-container-main-box'>
                <div>
                    <p className='owner-container-main-box-title poppins'>Crie sua conta</p>
                    <CustomInput value={newEmail} setValue={setNewEmail} label="E-mail" type="email" />
                    <CustomInput value={newPassword} setValue={setNewPassword} label="Senha" type="email" />
                    <button onClick={handleCreateAccount} className='owner-button pointer owner-button-create-account'>Criar conta</button>
                </div>
            </div>
        </div>
    )
}