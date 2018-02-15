import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/test_app/'
// const TEST_APP_URL= 'test_app/'

export {getTravel, getTravelList, getGroups, createUser}

function addURLParams(url, opts){
    url += '?'
    for (var key in opts){
        url += key
        url += "="
        url += opts[key]
        url += "&&"
    }
    url = url.slice(0,-2)
    return url
}

function getRequest(url){
    var header = {
        'Authorization' : 'Bearer ' + localStorage.getItem('tWeb_access_token')
    }
    return axios.get(url, {headers: header});
}

function postRequest(url, data){
    var header = {
        'Authorization' : 'Bearer ' + localStorage.getItem('tWeb_access_token')
    }
    return axios.post(url, data);
}

// Travel requests
function getTravelList(opts=null){
    let url = BASE_URL + 'travels/'
    // console.log("params is " + opts)
    if (opts!==null){
        url = addURLParams(url, opts)
    }
    return getRequest(url);
} 

function getTravel (id){
    const url = BASE_URL + 'travels/' + id + '/'
    return getRequest(url);
}

// Group requests
function getGroups(opts=null){
    let url = BASE_URL + "groups/"
    if (opts!=null){
        url = addURLParams(url, opts)
    }
    return getRequest(url);
}

export function getGroup(id){
    const url = BASE_URL + 'travels' + id + '/'
    return getRequest(url)
}

// user request 
function createUser(data){
    let url = BASE_URL + 'users/'
    // axios.defaults.headers.common['Content-Type'] = "application/json"
    return postRequest(url, data)
}

export function getUserId(id){
    let url = BASE_URL + 'users/' + id + '/'
    return getRequest(url)
}

