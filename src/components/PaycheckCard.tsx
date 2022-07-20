import { useContext } from 'react';
import { getMonth } from '../config/getMonth';
import { AuthContext } from '../context/authContext';
import './PaycheckCard.css'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { IoMdDownload } from 'react-icons/io';

interface IPaycheckCard {
    singlePaycheck: any;
}

export default function PaycheckCard({ singlePaycheck }: IPaycheckCard) {

    const { user, } = useContext(AuthContext);

    const createdAt = new Date(singlePaycheck.createdAt);
    const userCreatedAt = new Date(user.created_at)
    const money = user.position.toLowerCase() == "estagiário" ? singlePaycheck.money : singlePaycheck.money * 0.93;
    const admissionDate = `${userCreatedAt.getDate().toString().padStart(2, "0")}/${(userCreatedAt.getMonth() + 1).toString().padStart(2, "0")}/${userCreatedAt.getFullYear()}`

    function printDocument() {
        const input = document.getElementById(singlePaycheck.id) as HTMLElement;
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0, -120, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save(`Contra cheque, mês de ${createdAt.getMonth()} .pdf`);
            })
            ;
    }

    return (
        <div id={singlePaycheck.id} className="paycheck-card-container">
            <p onClick={() => printDocument()}>Download</p>
            <IoMdDownload className='download-button' onClick={() => printDocument()} />
            <div className='paycheck-card-container-header'>
                <div className='paycheck-card-container-header-item'>
                    <p>{singlePaycheck.companyName}</p>
                    <p>{singlePaycheck.cnpj}</p>
                </div>
                <div className='paycheck-card-container-header-item'>
                    <p>Recibo de pagamento de salário:</p>
                    <p>Mês de referência: {getMonth(createdAt.getMonth())}</p>
                </div>
            </div>
            <div className='paycheck-card-container-user-infos'>
                <div className='paycheck-card-container-funcionary-infos'>
                    <div>
                        <p>Código</p>
                        <p>{singlePaycheck.id.substring(5, 10)}</p>
                    </div>
                    <div>
                        <p>Nome</p>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <p>Admissão</p>
                        <p>{admissionDate}</p>
                    </div>
                    <div>
                        <p>Funcão</p>
                        <p>{user.position}</p>
                    </div>
                </div>
                <div className='paycheck-card-container-paycheck-infos'>
                    <div className='paycheck-card-container-paycheck-infos-data'>
                        <div>
                            <p className='paycheck-info-header'>Código</p>
                            <p>001</p>
                        </div>
                    </div>
                    <div className='paycheck-card-container-paycheck-infos-data'>
                        <div className=''>
                            <p className='paycheck-info-header'>Salário</p>
                            <p>{singlePaycheck.money}</p>
                        </div>
                    </div>
                    <div className='paycheck-card-container-paycheck-infos-data'>
                        <div className=''>
                            <p className='paycheck-info-header'>Vencimentos</p>
                            <p></p>
                        </div>
                    </div>
                    <div className='paycheck-card-container-paycheck-infos-data'>
                        <div className=''>
                            <p className='paycheck-info-header'>Descontos:</p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='liquid-value'>
                <div className='liquid-value-data'>
                    <p>Valor líquido: </p>
                    <p>R${money}</p>
                </div>
            </div>
        </div>
    )
}