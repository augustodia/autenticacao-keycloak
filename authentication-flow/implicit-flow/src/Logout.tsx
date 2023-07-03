import {useContext, useEffect} from "react";
import {AuthContext} from "./AuthProvider.tsx";

export function Logout() {
    const {makeLogoutUrl} = useContext(AuthContext);

    useEffect(() => {
        window.location.href = makeLogoutUrl();
    }, [makeLogoutUrl])

    return(
        <div>
            Loading...
        </div>
    )
}