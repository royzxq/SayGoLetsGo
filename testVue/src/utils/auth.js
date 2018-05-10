import axios from 'axios'
// import Router from 'vue-router'

const clientID = 'UmON6RgDt59R9rkZM0gwk2FhAN1XTLtywAYBfspX'
const clientSec = 'i4FQLXAmqC4NfUDHk2OyyOiaM9FhQQMoqKtMvJUO8oFyw1VgiRN6fvG1EWyhlEGyZGIrVPWhRsbiDCzyFCtUibXQ3uAOGQRdcnvzcMfiyZ8m5KVmaSAlgRE12wNnk2Ww'
const AUTH_URL = 'http://127.0.0.1:8000/o/token/'

// export {login_user}

export function login_user(username, password){
    var tokenRequester = {}
    tokenRequester.username = username
    tokenRequester.password = password
    tokenRequester.username = 'testUser2'
    tokenRequester.password = 'k4H33TMgyeCMXk3q'
    tokenRequester.grant_type = 'password'
    tokenRequester.client_id = clientID
    tokenRequester.client_secret = clientSec
    var headers = {
        'Content-Type': "application/x-www-form-urlencoded"
    }
    // axios.defaults.headers.common['Content-Type'] = "application/json"
    // axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded"
    // let data = JSON.stringify(tokenRequester)
    return axios.post(AUTH_URL, tokenRequester, {headers: headers});
}

export function generate_token_request(username, password){
    var tokenRequester = {}
    
    if(username){
      tokenRequester.username = username;
      tokenRequester.password = password;
    }
    else{
      tokenRequester.username = 'testUser2'
      tokenRequester.password = 'k4H33TMgyeCMXk3q'
    }
    tokenRequester.grant_type = 'password'
    tokenRequester.client_id = clientID
    tokenRequester.client_secret = clientSec
    return tokenRequester
}

export function logout(){
    console.log('logout')
    localStorage.setItem('tWeb_access_token', '')
    localStorage.setItem('tWeb_username','')
    localStorage.setItem('tWeb_userId', '')
    localStorage.removeItem('tWeb_access_token')
    localStorage.removeItem('tWeb_username')
    localStorage.removeItem('tWeb_userId')
}

export function is_logged_in(){
    let token = localStorage.getItem('tWeb_access_token')
    if (token !== null){
      let expire = localStorage.getItem('tWeb_expired')
      let now = new Date().getTime() / 1000
      if (now < expire){
        return true
      }
    }
    return false;
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
