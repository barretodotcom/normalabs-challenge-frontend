import './Home.css'

export default function FirstCopyHeader() {
    return (
        <div className="container">
            <div className='label'>
                <h1 className='copy-text poppins'>Seja bem-vindo à minha(ou<a className='orange'> nossa</a>, né?) aplicação!</h1>
            </div>
            <div className='label box'>
                <h1 className='poppins func text-size'>Fiquem à vontade! Explorem as funcionalidades, o que vocês pediram para fazer está no login/criar conta!</h1>
            </div>
        </div>
    )
}