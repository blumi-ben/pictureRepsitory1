

export function validEmail(email) {
    if (email != '' && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        return {
            status: true,
            message: 'valid'
        }
        else return {
            status: false,
            message: 'Email not valid'
        }
}

export function validUserName(userName){
    if(userName!=''&& /^[a-z\s]+$/i.test(userName))
    return {
        status: true,
        message: 'valid'
    }
    else return {
        status: false,
        message: 'UserName not valid, Enter letters only'
    }
}

export function validPassword(password){
    if(password!=''&& /.{8,10}$/.test(password))
    return {
        status: true,
        message: 'valid'
    }
    else return {
        status: false,
        message: 'Enter between 8 and 10 characters'
    }
}