import {useContext, useEffect} from "react";
import {AuthContext} from "./AuthProvider.tsx";
import {makeLoginUrl} from "./utils.ts";

export function Admin() {
    const {auth,makeLogoutUrl} = useContext(AuthContext);

    useEffect(() => {
        if(!auth) window.location.href = makeLoginUrl();
    }, [auth])

    function logout() {
        window.location.href = makeLogoutUrl();
    }

    return (
        <div>
            <button onClick={logout}>Logout</button>
            <h1>Admin</h1>
            <pre >{JSON.stringify(auth)}</pre>
        </div>
    )
}
