// function validateEmail(email) {
//     var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
// }


let validateEmail = (rule, value, callback) => {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value === '') {
        callback(new Error('请输入邮箱'))
    } else {
        if (re.test(value)) callback()
        else {
            callback(new Error('请输入正确的邮箱地址'))
        }
    }
}

let validatePhone = (rule, value, callback) => {
    let phone_re = /^1[3456789]\d{9}$/;
    if (value === '') { callback(new Error('请输入电话号码')) } else {
        if (phone_re.test(value)) {
            callback()
        } else {
            callback(new Error('请输入正确的电话号码'))
        }
    }
}
export { validateEmail, validatePhone }