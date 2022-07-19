import { useContext, useState } from "react"
import { AuthContext } from "../context/authContext";
import "./LoginPage.css"

export default function LoginPage() {

    const { signIn, loginError } = useContext(AuthContext);

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    async function handleSignIn() {
        await signIn({ email, password });
    }

    return (
        <div className="login-page-container">

            <div className="login-form">
                <p className="poppins login-title">Faça login</p>
                <div className="inputs-form">
                    <div className="input-container">
                        <p className="poppins">Email</p>
                        <input onChange={e => setEmail(e.target.value)} placeholder="Insira seu e-mail" className="input-login" type={"email"} name="email" />
                    </div>
                    <div className="input-container">
                        <p className="poppins">Senha</p>
                        <input onChange={e => setPassword(e.target.value)} placeholder="Insira sua senha" className="input-login" type={"password"} name="password" />
                    </div>
                    <div className='button-login-container'>
                        <p onClick={() => handleSignIn()} className='button-login pointer poppins'>LOGIN</p>
                    </div>
                </div>

            </div>

        </div>
    )
}