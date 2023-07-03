import Cookies from 'js-cookie';
import { decodeJwt } from 'jose'

export function login(accessToken: string, idToken: string, state: string) {
    const stateCookie = Cookies.get('state');

    if(stateCookie !== state) throw new Error('Invalid state');

    let decodedAccessToken;
    let decodedIdToken;

    try {
        decodedAccessToken = decodeJwt(accessToken);
        decodedIdToken = decodeJwt(idToken);
    } catch (error) {
        throw new Error("Invalid token")
    }

    const nonceCookie = Cookies.get('nonce');

    if(decodedAccessToken.nonce !== nonceCookie || decodedIdToken.nonce !== nonceCookie) throw new Error('Invalid nonce');

    Cookies.set('access_token', accessToken);
    Cookies.set('id_token', idToken);

    return decodedAccessToken;
}

export function makeLoginUrl() {
    const nonce = Math.random().toString(36);
    const state = Math.random().toString(36);

    Cookies.set('nonce', nonce);
    Cookies.set('state', state);

    const loginUrlParams = new URLSearchParams({
        client_id: 'fullcycle-client',
        redirect_uri: 'http://localhost:3000/callback',
        response_type: 'token id_token',
        scope: 'openid',
        nonce: nonce,
        state: state,
    })

    return `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/auth?${loginUrlParams.toString()}`
}

export function getAuth() {
    const token = Cookies.get('access_token');

    if(!token) return null;

    try {
        return decodeJwt(token);
    } catch (error) {
        console.error(error);
        return null;
    }

}

export function makeLogoutUrl() {
    const idToken = Cookies.get('id_token');

    if(!idToken) return 'http://localhost:3000/login'

    const logoutParams = new URLSearchParams({
        id_token_hint: idToken,
        post_logout_redirect_uri: 'http://localhost:3000/login',
    })

    Cookies.remove('access_token');
    Cookies.remove('id_token');
    Cookies.remove('nonce');
    Cookies.remove('state');

    return `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/logout?${logoutParams}`;

}
