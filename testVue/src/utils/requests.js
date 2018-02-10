import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/test_app/'
// const TEST_APP_URL= 'test_app/'

export {getTravel, getTravelList}

function getTravelList(){
    const url = BASE_URL + 'travels/'
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tWeb_access_token')
    var header = {
        'Authorization' : 'Bearer ' + localStorage.getItem('tWeb_access_token')
    }
    return axios.get(url, {headers: header}).then(response => response.data).catch(error => error);
}

function getTravel(id){
    const url = BASE_URL + 'travels/' + id + '/'
    var header = {
        'Authorization' : 'Bearer ' + localStorage.getItem('tWeb_access_token')
    }
    return axios.get(url, {headers: header}).then(response => response.data).catch(error => error);
}