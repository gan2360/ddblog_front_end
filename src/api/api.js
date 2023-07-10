import service from './axios.js'

function UserRegister(info) {
    return service.post('user/', info)
}

function UserLogin(info) {
    return service.get('login/', { params: info })
}

function getUser(username) {
    return service.get(`user/${username}`)
}

function getAllUser() {
    return service.get('user/')
}

function updateUser(username, info) {
    return service.put(`user/${username}`, info)
}

function getSMS(info) {
    return service.post('register/sms/', info)
}

function validateUsername(username) {
    return service.get(`validate_username/${username}`)
}

function postEssay(username, info) {
    return service.post(`topic/${username}`, info)
}

function getEssayList(username, info) {
    return service.get(`topic/${username}`, {
        params: info
    })
}

function getEssayDetail(username, t_id) {
    return service.get(`topic/${username}/${t_id}`)
}

function postMessage(t_id, info) {
    return service.post(`message/${t_id}`, info)
}

function tokenCheck() {
    return service.post('token/check')
}

function getRandomTpoics() {
    return service.get('home/topics')
}
export { UserRegister, UserLogin, getUser, getAllUser, updateUser, getSMS, validateUsername, postEssay, getEssayList, getEssayDetail, postMessage, tokenCheck, getRandomTpoics }