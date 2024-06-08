import instanceAxios from "../axios"

export const apiCreateNewPropertyType = (data: any) => instanceAxios({
    url: '/property-type/create-new',
    method: 'POST',
    data,
})

export const apiGetPropertyType = (params: any) => instanceAxios({
    url: '/property-type/get-propertypes',
    method: 'get',
    params
})