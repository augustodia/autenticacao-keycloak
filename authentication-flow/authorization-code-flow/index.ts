import express from 'express';

const app = express();

app.get('/login', (req, res) => {
    const loginParams = new URLSearchParams({
        client_id: 'fullcycle-client',
        redirect_uri: 'http://localhost:3000/callback',
        response_type: 'code',
        scope: 'openid'
    }).toString();

    const url = `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/auth?${loginParams}`;

    console.log(url)

    res.redirect(url)
})

app.get('/callback', async (req, res) => {
    console.log(req.query)

    const bodyParams = new URLSearchParams({
        client_id: 'fullcycle-client',
        gran_type: 'authorization_code',
        code: req.query.code as string,
        redirect_uri: 'http://localhost:3000/callback',
    }).toString();

    const url = `http://keycloak:8080/realms/fullcycle-realm/protocol/openid-connect/token`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyParams
    })

    const data = await response.json();
    console.log(data);

    res.json(data)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})