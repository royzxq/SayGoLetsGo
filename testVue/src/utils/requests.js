import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/test_app/'
// const TEST_APP_URL= 'test_app/'

export {getTravel, getGroups, createUser}


//////////////////////////////////////////////////////////////////////////////
// helper functions
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

function putRequest(url, data){
  var header = {
    'Authorization' : 'Bearer ' + localStorage.getItem('tWeb_access_token')
  }
  url = url + data.id + '/'
  return axios.put(url, data, {headers: header})
}

function patchRequest(url, data){
  var header = {
    'Authorization' : 'Bearer ' + localStorage.getItem('tWeb_access_token')
  }
  url = url + data.id + '/'
  return axios.patch(url, data, {headers: header});
}

function deleteRequest(url){
  var header = {
    'Authorization' : 'Bearer ' + localStorage.getItem('tWeb_access_token')
  }
  return axios.delete(url, {headers: header});
}


//////////////////////////////////////////////////////////////////////////////

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

export function updateTravelGroup(data){
  const url = BASE_URL + 'travelgroups/'
  return putRequest(url, data);
}

export function partialUpdateTravelGroup(data){
  const url = BASE_URL + 'travelgroups/'
  return patchRequest(url, data);
}

export function deleteTravelGroup(id){
  const url = BASE_URL + 'travelgroups/' + id + '/'
  return deleteRequest(url)
}

// Membership requests
export function getMemberships(opts=null){
  return getAppRequest('memberships/', opts)
}

export function getMembership(id){
  const url = BASE_URL + 'memberships/' + id + '/'
    return getRequest(url)
}

export function createMembership(data){
  const url = BASE_URL + 'memberships/'
  return postRequest(url, data)
}

export function updateMembership(data){
  const url = BASE_URL + 'memberships/'
  return putRequest(url, data);
}

export function deleteMembership(id){
  const url = BASE_URL + 'memberships/' + id + '/'
  return deleteRequest(url)
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

export function updateUser(data){
  const url = BASE_URL + 'users/'
  return putRequest(url, data);
}

export function partialUpdateUser(data){
  const url = BASE_URL + 'users/'
  return patchRequest(url, data);
}

export function deleteUser(id){
  const url = BASE_URL + 'users/' + id + '/'
  return deleteRequest(url)
}

// activity request
export function getActivities(opts=null){
    return getAppRequest('activities/', opts);
}

export function createActivity(data){
    let url = BASE_URL + 'activities/'
    return postRequest(url, data)
}

export function updateActivity(data){
  const url = BASE_URL + 'activities/'
  return putRequest(url, data);
}

export function partialUpdateActivity(data){
  const url = BASE_URL + 'activities/'
  return patchRequest(url, data);
}

export function deleteActivity(id){
  const url = BASE_URL + 'activities/' + id + '/'
  return deleteRequest(url)
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

export function updatePlace(data){
  const url = BASE_URL + 'places/'
  return putRequest(url, data);
}

export function partialUpdatePlace(data){
  const url = BASE_URL + 'places/'
  return patchRequest(url, data);
}

export function deletePlace(id){
  const url = BASE_URL + 'places/' + id + '/'
  return deleteRequest(url)
}
// expense request
export function createExpense(data){
    let url = BASE_URL + 'expenses/'
    return postRequest(url, data)
}

export function updateExpense(data){
  const url = BASE_URL + 'expenses/'
  return putRequest(url, data);
}

export function partialUpdateExpense(data){
  const url = BASE_URL + 'expenses/'
  return patchRequest(url, data);
}

export function deleteExpense(id){
  const url = BASE_URL + 'expenses/' + id + '/'
  return deleteRequest(url)
}


// friendship request
export function createFriendship(data){
  let url = BASE_URL + 'friends/'
  return postRequest(url, data)
}

export function deleteFriendship(id){
  const url = BASE_URL + 'friends/' + id + '/'
  return deleteRequest(url)
}
