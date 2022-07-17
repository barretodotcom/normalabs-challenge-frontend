import "./CreateAccountPage.css"

export default function CreateAccountPage() {

    async function handleSignIn() {
        console.log("oi")
    }

    return (
        <div className="create-account-container">
            <div className="create-account-form">

                <div className="form-container">
                    <div className="create-account-inputs-form">
                        <p className="poppins form-label">Nome</p>
                        <input type="text" name="name" className="input-create-account" />
                    </div>
                    <div className="create-account-inputs-form">
                        <p className="poppins form-label">Email</p>
                        <input type="text" name="email" className="input-create-account" />
                    </div>
                    <div className="create-account-inputs-form">
                        <p className="poppins form-label">Senha</p>
                        <input type="text" name="password" className="input-create-account" />
                    </div>

                    <div className="create-account-inputs-form">

                        <p className="poppins form-label">Cargo</p>
                        <select className="input-create-account position-selector">
                            <option>Estagiário</option>
                            <option>Dev</option>
                            <option>Tech Lead</option>
                            <option>Engineer Manager</option>
                            <option>Product Owner</option>
                        </select>
                    </div>

                    <div className="create-account-inputs-form">
                        <p className="poppins form-label">Número da sua conta</p>
                        <input type="text" placeholder="Insira o número da sua conta." className="input-create-account" />
                    </div>

                    <div className="create-account-inputs-form">
                        <p className="poppins form-label">CPF</p>
                        <input type={"number"} placeholder="Insira o seu CPF." className="input-create-account" />
                    </div>

                    <div className='button-create-account-container'>
                        <p onClick={() => handleSignIn()} className='button-create-account pointer poppins'>CRIAR CONTA</p>
                    </div>

                </div>

            </div>
        </div>
    )
}