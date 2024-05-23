import React, { useState } from "react";
import OtpInput from "react-otp-input";
import Button from "../commons/Button";
import { toast } from "react-toastify";

const VerifyOTP = ({ handleSuccess }: any) => {
  const [otp, setOtp] = useState("");
  
  const handleSubmitOtp = () => {
    if (window.confirmationResult) {
      window.confirmationResult
        .confirm(otp)
        .then((result: any) => {
          if (result && result?.operationType === "signIn") {
            handleSuccess();
          }
        })
        .catch((err: any) => {
          if (err) {
            toast.error("Confirm OTP your not match !!!");
          }
        });
    }
  };

  return (
    <div className="w-full h-full flex gap-10 flex-col justify-center items-center overflow-hidden bg-white ">
      <div className="text-center px-3">
        <span>
          Code OTP was send to your phone number. Please check your phone
          message with code verify and write below
        </span>
      </div>
      <div className="flex justify-center items-center">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>{""}</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle="px-5 mx-3 h-16"
          shouldAutoFocus={true}
        />
      </div>
      <div className="flex justify-between gap-5">
        <div>
          <Button handleOnClick={handleSubmitOtp}>Send OTP</Button>
        </div>
        <div>
          <Button handleOnClick={() => setOtp("")}>Clear OTP</Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
