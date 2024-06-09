import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import icons from "../../utils/icons"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { apiUploadImageToCloudinary } from "../../apis/uploadFileApiCloudinary"

type TInputFile = {
    style?: any, 
    containerClassName?: any,
    label?: string,
    id: string,
    type?: string,
    errors?: any,
    inputClassName?: any,
    validate?: any,
    allowMutiple?: boolean,
    getImages?: any
}

type TImage = {
  id: string,
  url: string
}


const InputFileUpload = ({containerClassName, label, id, validate, allowMutiple, getImages} 
: TInputFile) => {

  const [images, setImages] = useState<TImage[]>([]);

  const [isLoadingUpload, setIsLoadingUpload] = useState<Boolean>(false);

  const { IoMdImages, IoMdCloseCircle, FaSpinner } = icons;

  const {watch, register, formState: {errors}} = useForm();

  const rawsImage = watch(id);


  const handleUploadImage = async (fileRawsImage: FileList) => {
      const formData = new FormData();
      const promiseApi = [];
      const listUrlImages: TImage[] = [];
      for (let file of fileRawsImage) {
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_FILENAME);
        promiseApi.push(apiUploadImageToCloudinary(formData))
      }

      setIsLoadingUpload(true);

      const response = await Promise.all(promiseApi);

      setIsLoadingUpload(false);

      if (response && response?.length > 0) {
        response?.map(el => listUrlImages.push({id: el?.data?.public_id, url: el?.data?.url}))
      }
      setImages(listUrlImages);

  }

  useEffect(() => {
    if(rawsImage && rawsImage instanceof FileList && rawsImage?.length > 0) {
      handleUploadImage(rawsImage);
    }
  }, [rawsImage])

  useEffect(() => {
    getImages(images);
  }, [images])

  return (
    <div className={twMerge(clsx('flex flex-col w-full gap-1 mb-2', containerClassName))}>
        {label && <span className="font-medium text-gray-700">{label}</span>}
        <input multiple={allowMutiple} type='file' id={id} {...register(id, validate)} className="hidden"
        ></input>
        
            {
              images && images?.length > 0 ? <div className="flex gap-4 justify-start">
                {images.map(item => (
                  <div className="w-[120px] relative">
                    <img className="" src={item?.url}></img>
                    <div onClick={() => setImages(prev => prev.filter(img => img?.id !== item?.id) )} className="absolute cursor-pointer top-0 right-0 p-2">
                      <IoMdCloseCircle size={20} />
                    </div>
                  </div>
                ))}
              </div> : isLoadingUpload ? <div className="w-full h-full mt-10 flex justify-center items-center">
                <span className="animate-spin">
                  <FaSpinner size={28}></FaSpinner>
                </span>
              </div> : 
              <label className="bg-gray-100 w-full p-16 flex items-center justify-center gap-2" htmlFor={id}>
                <span className="text-gray-800">
                  <IoMdImages size={28} />
                </span>
              </label>
            }
        
        {errors && errors[id] && <small className="text-red-600 font-semibold">{}</small>}
    </div>
  )
}

export default InputFileUpload