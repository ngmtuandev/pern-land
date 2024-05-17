import instanceAxios from "../axios"

export const apiCreateNewPropertyType = (data) => instanceAxios({
    url: '/property-type/create-new',
    method: 'POST',
    data,
})