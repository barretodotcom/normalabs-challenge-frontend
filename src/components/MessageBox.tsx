import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import './MessageBox.css'

export default function MessageBox() {

    const { error, sucessMessage } = useContext(AuthContext);
    if (error) {
        return (<div className="error-box error-message poppins">
            <p>{error}</p>
        </ div>)

    }
    if (sucessMessage) {
        return (<div className="sucess-box sucess-message poppins">
            <p>{sucessMessage}</p>
        </ div>)
    }
    return null;
}