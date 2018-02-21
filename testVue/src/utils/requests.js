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

function getAppRequest(suffix, opts=null){
    let url = BASE_URL + suffix
    // console.log("params is " + opts)
    if (opts!==null){
        url = addURLParams(url, opts)
    }
    return getRequest(url);
}

function postRequest(url, data){
    var header = {
        'Authorization' : 'Bearer ' + localStorage.getItem('tWeb_access_token')
    }
    return axios.post(url, data, {headers: header});
}

// Travel requests
function getTravelList(opts=null){
    return getAppRequest('travels/', opts);
} 

function getTravel (id){
    const url = BASE_URL + 'travels/' + id + '/'
    return getRequest(url);
}

export function createTravel(data){
    const url = BASE_URL + 'travels/'
    return postRequest(url, data)
}

// Group requests
function getGroups(opts=null){
    return getAppRequest('groups/', opts);
}

export function getGroup(id){
    const url = BASE_URL + 'groups/' + id + '/'
    return getRequest(url)
}

export function createGroup(data){
    const url = BASE_URL + 'groups/'
    return postRequest(url, data)
}

// user request 
function createUser(data){
    let url = BASE_URL + 'users/'
    return postRequest(url, data)
}

export function getUserId(id){
    let url = BASE_URL + 'users/' + id + '/'
    return getRequest(url)
}

export function getUsers(opts=null){
    return getAppRequest('users/', opts);
}

// activity request
export function getActivities(opts=null){
    return getAppRequest('activities/', opts);
}

export function createActivity(data){
    let url = BASE_URL + 'activities/'
    return postRequest(url, data)
}

// place request 
export function getPlace(id){
    let url = BASE_URL + 'places/' + id + '/'
    return getRequest(url)
}

export function createPlace(data){
    let url = BASE_URL + 'places/'
    return postRequest(url, data)
}