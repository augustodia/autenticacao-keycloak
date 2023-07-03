import {useContext, useEffect} from "react";
import {AuthContext} from "./AuthProvider.tsx";
import {makeLoginUrl} from "./utils.ts";

export function Admin() {
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        if(!auth) window.location.href = makeLoginUrl();
    }, [auth])

    return (
        <div>
            <h1>Admin</h1>
            <pre >{JSON.stringify(auth)}</pre>
        </div>
    )
}
