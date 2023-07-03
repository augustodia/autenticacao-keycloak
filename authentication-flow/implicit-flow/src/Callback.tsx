import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AuthContext} from "./AuthProvider.tsx";

export function Callback() {
    const navigate = useNavigate();
    const { hash } = useLocation();
    const { login, auth } = useContext(AuthContext);

    useEffect(() => {
        if(auth) return navigate('/login')

        const searchParams = new URLSearchParams(hash.replace('#', ''))
        const accessToken = searchParams.get('access_token');
        const idToken = searchParams.get('id_token');
        const state = searchParams.get('state');

        if(!accessToken || !idToken || !state) {
            // Go to login
            return;
        }

        login(accessToken, idToken, state);

        console.log('Deu certo');
    },[hash, login, auth, navigate])

    return (
        <div>
            Loading...
        </div>
    )
}