import { useForm } from "react-hook-form"
import { Button, InputFileUpload, InputForm, TextArea, TitleStyle } from "../../../components"
import { apiCreateNewPropertyType } from "../../../apis/propertyType"
import { toast } from "react-toastify"

type TImage = {
  id: string,
  url: string
}

const CreatePropertyType = () => {

  const {register, formState: {errors}, handleSubmit, reset, setValue} = useForm();


  const handleOnUpload = async (data: any) => {
    console.log('data : ->>>', data);

    const {image, ...payload} = data;
    const response = await apiCreateNewPropertyType({...payload, image: image[0]});
    console.log('response create new property type : ', response);

    if(response && response?.success) {
      toast.success('Create property type success'); 
      reset();
    }
    else {
      toast.error('Create property type failure'); 
      reset();
    }

  }

  return (
    <div className="">
      <TitleStyle content='Create Property Type'>
        <div>
          <Button handleOnClick={handleSubmit(handleOnUpload)}>Create</Button>
        </div>
      </TitleStyle>
      <form className="p-4">
        <InputForm 
        id="name" register={register} errors={errors} 
        validate={{required: 'This field cannot empty'}} 
        label="Property Type Name"></InputForm>
        <TextArea id="description" register={register} errors={errors} 
        validate={{required: 'This field cannot empty'}} 
        label="Description Property Type"></TextArea>
        <InputFileUpload id="images" errors={errors}  allowMutiple={true} 
        getImages={(images : TImage[]) => setValue('image', images?.map((el: TImage) => el?.url))}
        validate={{required: 'This yield is not empty'}} label="image"></InputFileUpload>
      </form>
    </div>
  )
}

export default CreatePropertyType