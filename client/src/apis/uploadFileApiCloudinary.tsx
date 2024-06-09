import axios from "axios";

export const apiUploadImageToCloudinary = (data: any) => axios({
    method: 'POST',
    url: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
    data
})