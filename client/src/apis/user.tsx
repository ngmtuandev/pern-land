import instanceAxios from "../axios";

export const apiGetUser = () => instanceAxios({
    url: '/user/user-current',
    method: 'GET'
})