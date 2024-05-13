import instanceAxios from "../axios"

export const apiRegister = (data) => instanceAxios({
    url: '/auth/register',
    method: 'POST',
    data,
})

export const apiSignIn = (data) => instanceAxios({
    url: '/auth/sign-in',
    method: 'POST',
    data,
})