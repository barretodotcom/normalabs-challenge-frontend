import './Functionalities.css'
import { IoMdRocket } from "react-icons/io";
import { BsCardList, BsFillPersonFill } from 'react-icons/bs'
import { FaMoneyCheckAlt, FaUserTie } from 'react-icons/fa';
import { MdStickyNote2 } from 'react-icons/md';

export default function Funcionabillities() {
    return (
        <div className="func-container">

            <div className="how-works-container">

                <div className='labels-container'>

                    <div className='index'>
                        <h1 className='poppins principal'>1. Como funciona a aplicação?</h1>
                        <h1 className='poppins explanation'>Basicamente, na aplicação, temos 4 entidades:</h1>
                        <div className='list-item'>
                            <BsFillPersonFill className='text-size-func' />
                            <h1 className='poppins explanation'>Usuários</h1>
                        </div>
                        <div className='list-item'>
                            <MdStickyNote2 className='text-size-func' />
                            <h1 className='poppins explanation'>Service Desk</h1>
                        </div>
                        <div className='list-item'>
                            <FaMoneyCheckAlt className='text-size-func' />
                            <h1 className='poppins explanation'>Contra-cheque</h1>
                        </div>
                        <div className='list-item'>
                            <FaUserTie className='text-size-func' />
                            <h1 className='poppins explanation'>Owner(vou explicar abaixo)</h1>
                        </div>
                    </div>

                    <div className='index'>
                        <h1 className='poppins principal'>2. Especificacões</h1>

                        <div>
                            <h1 className='poppins explanation entity'>O <strong>usuário</strong>, na tabela, possui os seguintes campos:</h1>
                            <ul style={{ marginLeft: 15, fontSize: 22, fontWeight: 200 }}>
                                <li className='poppins'>Nome</li>
                                <li className='poppins'>Email</li>
                                <li className='poppins'>Senha</li>
                                <li className='poppins'>Cargo</li>
                                <li className='poppins'>CPF</li>
                                <li className='poppins'>Foto de perfil</li>
                                <li className='poppins'>Contra cheques</li>
                                <li className='poppins'>Tarefas(Service Desk)</li>
                            </ul>
                        </div>

                        <div style={{ marginBlock: 30 }}>
                            <h1 className='poppins explanation entity'>As <strong>tasks(chamaremos Service Desk de Task a partir de agora)</strong>, na tabela, possuem os seguintes campos:</h1>
                            <ul style={{ marginLeft: 15, fontSize: 22, fontWeight: 200 }}>
                                <li className='poppins'>Título</li>
                                <li className='poppins'>Detalhes</li>
                                <li className='poppins'>Data de início</li>
                                <li className='poppins'>Data de finalização do serviço</li>
                                <li className='poppins'>Status</li>
                            </ul>
                        </div>

                        <div>
                            <h1 className='poppins explanation entity'>Os <strong>contra-cheques</strong>, na tabela, possuem os campos abaixo:</h1>
                            <ul style={{ marginLeft: 15, fontSize: 22, fontWeight: 200 }}>
                                <li className='poppins'>Nome da empresa</li>
                                <li className='poppins'>Razão social</li>
                                <li className='poppins'>CNPJ</li>
                                <li className='poppins'>Dinheiro que consta no pagamento</li>
                                <li className='poppins'>Usuário</li>
                            </ul>
                        </div>

                        <div style={{ marginBlock: 30 }}>
                            <h1 className='poppins explanation entity'>O <strong>Owner</strong>, como o nome diz, é o dono.</h1>
                            <h1 className='poppins little-font'>na regra de negócio que decidi implementar, o contra-cheque só poderá ser lançado pelo dono da empresa, como é algo fictício, decidi colocar somente os campos email e senha, já que só será necessário lançar o cheque.</h1>
                            <ul style={{ marginLeft: 15, fontSize: 22, fontWeight: 200, marginTop: 30 }}>
                                <li className='poppins'>Email e senha, como dito.</li>
                            </ul>
                        </div>

                        <div>
                            <p className='poppins start'>Então, para começar, crie sua conta!</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}