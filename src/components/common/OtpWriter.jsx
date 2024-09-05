import React, { useState } from 'react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import '../../css/otpWriter.css';
import { ToastContainer } from 'react-toastify';
import ShowToast from '@/helpers/ShowToast';

export function OtpWriter({ data, handleOtpVerification }) {
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleOtpVerification(otp, data);
      if (response.status === 400) {
        ShowToast('error', response.data.message);
      } else if (response.status === 200) {
        ShowToast('success', response.data.message);
        // handle successful OTP verification (e.g., navigate or close modal)
      }
    } catch (error) {
      console.log(error);
      ShowToast('error', 'An unexpected error occurred.');
    }
  };

  const handleChange = (value) => {
    setOtp(value);
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="otp-container">
        <label htmlFor="otp" className="otp-label">
          Enter OTP here:
        </label>
        <InputOTP maxLength={6} onChange={handleChange} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} id="otp" >
          <InputOTPGroup className="otp-group">
            <InputOTPSlot index={0} className="otp-slot" />
            <InputOTPSlot index={1} className="otp-slot" />
            <InputOTPSlot index={2} className="otp-slot" />
            <InputOTPSlot index={3} className="otp-slot" />
            <InputOTPSlot index={4} className="otp-slot" />
            <InputOTPSlot index={5} className="otp-slot" />
          </InputOTPGroup>
        </InputOTP>
        <button type="submit" className="otp-submit-button bg-gray-400 rounded font-bold">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
