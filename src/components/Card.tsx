import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import UserCardInfos from "./UserCardInfos";
import logo from '../assets/normatel-logo.png';
import './Card.css'
import UserCardVerse from "./UserCardVerse";

export default function Card() {
    const { user, avatar } = useContext(AuthContext);

    return (
        <div className="user-card-container">

            <div className="profile-picture-container card-shadow">
                <div className="card-logo-container">
                    <img className='card-logo' src={logo} />
                    <p className="poppins card-logo-container-title">Normalabs</p>
                </div>

                <div className="front-infos-container">

                    <div className="user-avatar-container">
                        <img className="user-avatar" src={`${avatar}`}></img>
                    </div>

                    <div className="card-front-info">
                        <label className="card-front-title">Nome</label>
                        <UserCardInfos style={{ textAlign: "center", marginBottom: "30%" }} info={user.name} />
                    </div>

                    <div className="card-front-info">
                        <label className="card-front-title">Cargo</label>
                        <UserCardInfos style={{ textAlign: "center" }} info={user.position} />
                    </div>

                </div>

            </div>

            <div className="user-infos-container card-shadow">

                <div className="user-infos-header">
                    <p style={{ fontWeight: "bold", fontSize: ".9rem" }} className="poppins">Normalabs</p>
                    <p style={{ textAlign: "center", fontSize: ".9rem" }}>Rua Professor Francisco Gonçalves - Dionísio Torres</p>
                    <p>Fortaleza - Ceará</p>
                </div>

                <UserCardVerse label="Nome:" data={user.name} />
                <UserCardVerse label="CPF:" data={user.cpf} />
                <UserCardVerse label="Email:" data={user.email} />

                <div className="verse-reg-container">
                    <p className="verse-reg">Esta identificação é de uso pessoal e intransferível.</p>
                    <p className="verse-reg">O colaborador deverá usá-lo obrigatoriamente em horário comercial.</p>
                    <p className="verse-reg"> Em caso de perda, favor comunicar imediatamente ao Departamento Pessoal da Normalabs.</p>
                </div>

            </div>

        </div>
    )
}