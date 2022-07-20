import './Paychecks.css'
import { ImDownload3 } from 'react-icons/im';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import PaycheckCard from '../../components/PaycheckCard';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function Paychecks() {

    const { paychecks } = useContext(AuthContext);
    const navigate = useNavigate();

    function slideLeft() {
        let slider = document.getElementById("slider") as HTMLElement;
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    function slideRight() {
        let slider = document.getElementById("slider") as HTMLElement;
        slider.scrollLeft = slider.scrollLeft + 500;
    }
    return (
        <div className='paychecks-container'>
            <div className='paychecks-container-title-container'>
                <p className='paychecks-container-title poppins'>Seja bem vindo à sua aba de contra cheques, onde você pode fazer o download de seus documentos de pagamento.</p>
            </div>
            {paychecks?.length ?
                <div className='paycheck-generator-container'>

                    <MdChevronLeft cursor={"pointer"} onClick={slideLeft} size={200} />

                    <div id="slider" className='paycheck-generator-list'>
                        {paychecks.map((paycheck, index) => (
                            <PaycheckCard singlePaycheck={paycheck} key={index} />
                        ))}
                    </div>

                    <MdChevronRight cursor={"pointer"} onClick={slideRight} size={200} />

                </div>

                :
                <div className='paychecks-container-title-container'>
                    <p className='paychecks-container-instructions poppins'>Como você não possui contra-cheques, (essa parte eu gostei de fazer), siga para a url deste site e insira o caminho <strong onClick={() => navigate("/owner")}>'/owner'</strong>, crie uma conta e siga as instruções.</p>
                </div>
            }
        </div >
    )
}