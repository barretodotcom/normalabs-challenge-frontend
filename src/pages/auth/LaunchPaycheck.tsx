import { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
import { ICreatePaycheck } from "../../services/PaycheckService";
import './LaunchPaycheck.css'

export default function LaunchPaycheck() {

    const { users, findAllUsers, createPaycheck } = useContext(AuthContext);

    useState(() => {
        async function find() {
            await findAllUsers();
        }
        find()
    })

    async function launchPaycheck({ companyName, socialReason, cnpj, extraTime, accountNumber, userId }: ICreatePaycheck) {
        await createPaycheck({ companyName, socialReason, cnpj, extraTime, accountNumber, userId });
    }

    return (
        <div className="launch-paycheck-container">
            <div className="launch-paycheck-container-title">
                <p>Seja bem vindo! Aqui você pode lançar os contra-cheques de seu funcionário.</p>
            </div>
            <div>
                <div className="launch-paycheck-container-title">
                    <p>Funcionários:</p>
                </div>
                <table className="poppins">
                    <thead>
                        <tr className="table-row-head ">
                            <td>Nome</td>
                            <td>CPF</td>
                            <td>E-mail</td>
                            <td>Cargo</td>
                            <td>Lançar contra-cheque.</td>
                        </tr>
                    </thead>

                    <tbody>
                        {users?.length ? users.map((user, index) => (
                            <tr className="table-row-data">
                                <td >{user.name}</td>
                                <td >{user.cpf}</td>
                                <td >{user.email}</td>
                                <td >{user.position}</td>
                                <td>
                                    <button onClick={async () =>
                                        await launchPaycheck({
                                            companyName: "Normalabs",
                                            accountNumber: user.accountNumber,
                                            cnpj: "36.958.291/0001-72",
                                            extraTime: 0,
                                            socialReason: "Normalabs HUB",
                                            userId: user.id
                                        }

                                        )} className="launch-button">Lançar</button>
                                </td>
                            </tr>
                        ))
                            : <p>Você ainda não tem funcionários.</p>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}