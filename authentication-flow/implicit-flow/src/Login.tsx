import {Navigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AuthContext} from "./AuthProvider.tsx";
import {makeLoginUrl} from "./utils.ts";

export function Login() {
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if(!auth) window.location.href = makeLoginUrl();
    }, [auth])

    return auth ? <Navigate to={ '/admin' } /> : (
        <div>
            Loading...
        </div>
    )
}