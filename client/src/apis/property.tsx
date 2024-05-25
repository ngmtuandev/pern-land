import instanceAxios from "../axios"

export const apiGetProperty = (params: any) => instanceAxios({
    url: '/properties/get-properties',
    method: 'GET',
    params
})