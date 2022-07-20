import { useContext, useState } from "react"
import CPFInputMask from "../components/CPFInputMask";
import { AuthContext } from "../context/authContext";
import "./CreateAccountPage.css"
import Loading from "../components/Loading";

export default function CreateAccountPage() {

    const { signUp, loading, user } = useContext(AuthContext);

    const [avatar, setAvatar] = useState<string | Blob>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [position, setPosition] = useState<string>("Estagiário");
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');

    async function handleSignIn() {
        const formData = new FormData();
        formData.append('avatar', avatar);
        await signUp({ name, email, password, position, accountNumber, cpf, formData });
    }


    return (
        <div className="create-account-container">
            <div className="form-container">
                {!user ? <div className="create-account-form">
                    {loading &&
                        <Loading />
                    }


                    <div className="create-account-inputs-form">
                        <p className="poppins form-label">Para começar, insira sua foto de perfil:</p>
                        <input onChange={e => e.target.files ? setAvatar(e.target.files[0]) : null} type="file" name="avatar" formEncType="multipart/form-data" placeholder="Insira sua imagem" className="input-create-account" />
                    </div>

                    <div className="create-account-inputs-form">
                        <p className="poppins form-label">Nome</p>
                        <input onChange={e => setName(e.target.value)} type="text" name="name" placeholder="Insira seu nome" className="input-create-account" />
                    </div>
                    <div className="create-account-inputs-form">
                        <p className="poppins form-label">Email</p>
                        <input onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="Insira seu email" className="input-create-account" />
                    </div>
                    <div className="create-account-inputs-form">
                        <p className="poppins form-label">Senha</p>
                        <input onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Insira sua senha" className="input-create-account" />
                    </div>

                    <div className="create-account-inputs-form">

                        <p className="poppins form-label">Cargo</p>
                        <select onChange={e => setPosition(e.target.value)} className="input-create-account position-selector">
                            <option value="Estagiário">Estagiário</option>
                            <option value="Dev">Dev</option>
                            <option value="Tech Lead">Tech Lead</option>
                            <option value="Engineer Manager">Engineer Manager</option>
                            <option value="Product Owner">Product Owner</option>
                        </select>
                    </div>

                    <div className="create-account-inputs-form">
                        <p className="poppins form-label">Número da sua conta</p>
                        <input onChange={e => setAccountNumber(e.target.value)} type="number" placeholder="Insira o número da sua conta." className="input-create-account" />
                    </div>

                    <div className="create-account-inputs-form">
                        <p className="poppins form-label">CPF</p>
                        <CPFInputMask className="input-create-account" value={cpf} setValue={setCpf} />
                    </div>

                    <div className='button-create-account-container'>
                        <p onClick={() => handleSignIn()} className='button-create-account pointer poppins'>CRIAR CONTA</p>
                    </div>

                </div>
                    : <p className="poppins">Você já está logado!</p>}
            </div>

        </div>
    )
}