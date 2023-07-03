import {PropsWithChildren, useContext} from "react";
import {AuthContext} from "./AuthProvider.tsx";
import {Navigate} from "react-router-dom";

export function PrivateRoute(props: PropsWithChildren) {
    const {auth} = useContext(AuthContext);

    if(!auth) return <Navigate to="/login" />;

    return props.children;
}