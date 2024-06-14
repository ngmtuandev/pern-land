import { useForm } from "react-hook-form";
import { Button, InputFileUpload, InputForm } from "../../components";
import { useUserStore } from "../../store/useUserStore";
import { useEffect, useState } from "react";
import avatar from "../../assets/Use.png";
import icons from "../../utils/icons";
import { apiUpdateUser } from "../../apis/user";
import { toast } from "react-toastify";

type TImage = {
  id: string;
  url: string;
};

const Personal = () => {
  const { current, getUserCurrent }: any = useUserStore();
  const [isUploadAvatar, setIsUploadAvatar] = useState(false);
  const { FaPen } = icons;
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (current) {
      reset({
        fullName: current?.name,
        phoneNumber: current?.phone,
        email: current?.email,
        address: current?.address,
      });
    }
  }, [current]);

  const handleOnUpdateInfo = async (data: any) => {
    const responseUpdate: any = await apiUpdateUser(data);
    if (responseUpdate?.success) {
      getUserCurrent();
      setIsUploadAvatar(false);
      toast.success(responseUpdate?.message);
    } else {
      toast.error(responseUpdate?.message);
    }
  };
  return (
    <div>
      <div className="mt-6 ml-6">
        <span className="pb-1 border-b-[2px] border-yellow-bold-main">
          My Profile
        </span>
      </div>
      <div className="px-6 mt-8">
        <form className="flex flex-col gap-6">
          <div className="w-full flex gap-6 justify-between">
            <InputForm
              label="Full Name"
              inputClassName="rounded-md"
              register={register}
              id="fullName"
              placeholder="Edit your fullname"
              errors={errors}
              type="text"
              validate={{ required: "Full name be full" }}
              required
            ></InputForm>
            <InputForm
              label="Phone Number"
              inputClassName="rounded-md"
              register={register}
              id="phoneNumber"
              placeholder="Edit your phone number"
              errors={errors}
              type="text"
              validate={{ required: "Phone number be full" }}
              required
              readOnly
            ></InputForm>
          </div>
          <div className="w-full flex gap-6 justify-between">
            <InputForm
              label="Email"
              inputClassName="rounded-md"
              register={register}
              id="email"
              placeholder="Edit your email"
              errors={errors}
              type="text"
              validate={{ required: "Email be full" }}
              required
            ></InputForm>
            <InputForm
              label="Address"
              inputClassName="rounded-md"
              register={register}
              id="address"
              placeholder="Edit your Address"
              errors={errors}
              type="text"
              validate={{ required: "Address be full" }}
              required
            ></InputForm>
          </div>
          <div className="mt-4">
            {!isUploadAvatar && (
              <div
                onClick={() => setIsUploadAvatar(true)}
                className="mb-3 flex gap-2"
              >
                <FaPen color="#FFBA00" size={15} />
                <small className="font-bold cursor-pointer text-yellow-bold-main">
                  Change Avatar
                </small>
              </div>
            )}
            {!isUploadAvatar ? (
              <div className="md:w-32 hover:bg-gray-200 cursor-pointer md:h-32 bg-gray-100 rounded-md flex justify-center items-center">
                {current?.avatar ? (
                  <img className="w-20 h-20" src={current?.avatar}></img>
                ) : (
                  <img className="w-20 h-20" src={avatar}></img>
                )}
              </div>
            ) : (
              <div className="">
                <small
                  onClick={() => setIsUploadAvatar(false)}
                  className="font-bold text-yellow-bold-main cursor-pointer"
                >
                  No change
                </small>
                <InputFileUpload
                  id="image"
                  errors={errors}
                  allowMutiple={true}
                  getImages={(images: TImage[]) => {
                    setValue("image", images[0]?.url);
                  }}
                  validate={{ required: "This yield is not empty" }}
                  label="update avatar"
                ></InputFileUpload>
              </div>
            )}
          </div>
        </form>
        <div className="mt-20 md:w-full flex justify-center items-center">
          <Button
            containerClassName="w-[400px]"
            handleOnClick={handleSubmit(handleOnUpdateInfo)}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Personal;
