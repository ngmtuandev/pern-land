import clsx from "clsx"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import InputForm from "../input/InputForm"
import Button from "../commons/Button"
import InputRadio from "../input/InputRadio"
import { apiRegister, apiSignIn } from "../../apis/auth"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import withRouter from "../../hocs/withRouter"
import { useModelStore } from "../../store/useModelStore"
import { useUserStore } from "../../store/useUserStore"

interface IRole {
  value: string;
  code: string;
}

interface RegisterResponse {
  success: boolean;
}

interface SignInResponse {
  statusCode: number;
  accessToken: string;
}


const Login = () => {

  const [varient, setVarient] = useState('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const { register, formState: {errors}, handleSubmit, reset } = useForm();

  const {setModel} : any = useModelStore();
  const {handleSetToken, roles} : any = useUserStore();

  const handleLoading = (flag : boolean) => setIsLoading(flag);

  useEffect(() => {
    reset();
  }, [varient])

  const handleOnSubmitSuccess = async (data: any) => {
    handleLoading(true);
    if (varient === 'REGISTER') {
      const response = await apiRegister(data);
      handleLoading(false);
      const rs: RegisterResponse = response.data;
      if (rs?.success) {
        Swal.fire({
          icon: "success",
          title: "Register account successfully",
          showConfirmButton: true,
          confirmButtonText: "Go to Login"
        }).then(({ isConfirmed }) => {
          if(isConfirmed) {
            setVarient('LOGIN');
          }
        })
        return;
      }
      else {
        toast.error('Register failure');
        return;
      }
    }

    else {
      const {name, role, ...payload} = data;
      handleLoading(true);
      const response = await apiSignIn(payload);
      handleLoading(false);
      const rs: SignInResponse = response.data;

      if (rs?.statusCode! === 200) {
        handleSetToken(rs?.accessToken);
        toast.success('Login success'); 
        setModel(false, null); 
      }
      else {
        toast.error('Login failure');
      }
    }

  }

  return (
    <div 
    onClick={e => e.stopPropagation()}
    className='bg-white rounded-md px-6 py-12 items-center w-[500px] flex flex-col gap-6'>
      <h1 className="text-3xl font-semibold tracking-tight font-agbalumo text-gray-700">Welcome to Land</h1>
      <div className="flex justify-start w-full border-b gap-6">
        <span 
        onClick={() => setVarient('LOGIN')}
        className={clsx(varient === 'LOGIN' && 'border-b-2 border-yellow-bold-main cursor-pointer', 'cursor-pointer')}>Login</span>
        <span 
        onClick={() => setVarient('REGISTER')}
        className={clsx(varient === 'REGISTER' && 'border-b-2 border-yellow-bold-main cursor-pointer', 'cursor-pointer')}>New Account</span>
      </div>
      <form className="flex flex-col w-full px-4">
        <InputForm label='Phone Number' inputClassName='rounded-md' register={register} 
        id='phone' placeholder='Type your phone number here' 
        errors={errors} validate={{
          required: 'Must be full',
          pattern: {
            value: /(0[3|5|7|8|9])+([0-9]{8})\b/,
            message: 'Phone number invalid !'
          }
        }}></InputForm>
        <InputForm label='Password' inputClassName='rounded-md' register={register} 
        id='password' placeholder='Password your number here' errors={errors}
        type="password" validate={{required: 'Must be full'}}></InputForm>
        {
          varient === 'REGISTER' &&  
          <InputForm label='Your Fullname' inputClassName='rounded-md' register={register} 
          id='name' placeholder='Type your fullname number here' 
          errors={errors} validate={{required: 'Must be full'}}></InputForm>     
        }
        {
          varient === 'REGISTER' && 
          <InputRadio label='Type Account' register={register} 
            id='role' validate={{required: 'Must be full'}}
            options={roles?.filter((el: IRole)=> el.value !== 'Admin')?.map((el: IRole) => ({label: el?.value, value: el?.code}))}  
          ></InputRadio>
        }
        <div className="mt-2">
          <Button handleOnClick={handleSubmit(handleOnSubmitSuccess)} containerClassName='w-full'>{varient === 'LOGIN' ? 'Sign in' : 'Register'}</Button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(Login)