import axios from 'axios'
// import Router from 'vue-router'

const clientID = '1DpyNljw31M1XFOjGUVFnxGaq8Fd3KoQQKsSqyVW'
const clientSec = '6TPMoAGyRjcRWcMNeb8LgBiZZk4DNFxYDPmgsl2lHQNEWGew81m3aSEJAaZNiacxY8t5q7eRF9rWAgFSYaoq9XbINTh2A528DMj9vfZppxYlRwxiURhIgXam6njZ2INd'
const AUTH_URL = 'http://127.0.0.1:8000/o/token/'

// export {login_user}

export function login_user(username, password){
    var tokenRequester = {}
    tokenRequester.username = username
    tokenRequester.password = password
    tokenRequester.username = 'testUser1'
    tokenRequester.password = 'E2VCt7UxZXhE8h9r'
    tokenRequester.grant_type = 'password'
    tokenRequester.client_id = clientID
    tokenRequester.client_secret = clientSec
    axios.defaults.headers.common['Content-Type'] = "application/json"
    // axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded"
    let data = JSON.stringify(tokenRequester)
    return axios.post(AUTH_URL, tokenRequester, {emulateJSON : true});    
}

export function generate_token_request(username, password){
    var tokenRequester = {}
    tokenRequester.username = username
    tokenRequester.password = password
    tokenRequester.username = 'testUser2'
    tokenRequester.password = 'k4H33TMgyeCMXk3q'
    tokenRequester.grant_type = 'password'
    tokenRequester.client_id = clientID
    tokenRequester.client_secret = clientSec
    return tokenRequester
}

export function logout(){
    console.log('logout')
    localStorage.setItem('tWeb_access_token', '')
    localStorage.setItem('tWeb_username','')
    localStorage.removeItem('tWeb_access_token')
    localStorage.removeItem('tWeb_username')
}

export function is_logged_in(){
    let token = localStorage.getItem('tWeb_access_token')
    // TODO
    // CHECK EXPIRE
    console.log("token is " + token)
    return token !== null;
}

export function requireAuth(to, from, next){
    if(!is_logged_in()){
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        });
    }else {
        next();
    }
}