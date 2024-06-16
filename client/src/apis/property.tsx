import instanceAxios from "../axios"

export const apiGetProperty = (params: any) => instanceAxios({
    url: '/properties/get-properties',
    method: 'GET',
    params
})

export const apiGetDetailProperty = (id: number) => instanceAxios({
    url: `/properties/get-detail-property/${id}`,
    method: 'GET',
})