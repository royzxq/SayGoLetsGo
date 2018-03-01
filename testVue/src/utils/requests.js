import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/test_app/'
// const TEST_APP_URL= 'test_app/'

export {getTravel, getGroups, createUser}

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

// TravelGroup requests
export function getTravelGroups(opts=null){
  return getAppRequest('travelgroups/', opts)
}

export function getTravelGroup(id){
  const url = BASE_URL + 'travelgroups/' + id + '/'
    return getRequest(url)
}

export function createTravelGroup(data){
  const url = BASE_URL + 'travelgroups/'
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

export function getPlaces(opts=null){
  return getAppRequest('places/', opts);
}

// expense request
export function createExpense(data){
    let url = BASE_URL + 'expenses/'
    return postRequest(url, data)
}