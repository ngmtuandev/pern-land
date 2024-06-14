import instanceAxios from "../axios";

export const apiGetUser = () => instanceAxios({
    url: '/user/user-current',
    method: 'GET'
})


export const apiGetRole = () => instanceAxios({
    url: '/user/roles',
    method: 'GET'
})

export const apiUpdateUser = (data: any) => instanceAxios({
    url: '/user//update-user',
    method: 'PATCH',
    data
})