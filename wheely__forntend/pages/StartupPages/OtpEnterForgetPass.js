import HeaderForPage from "../Layout/HeaderPage";
import FooterForPage from "../Layout/FooterPage";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";
import { returnOTP } from "./ForgetProfileSearch";
import PasswordChangeFromForget from "./PasswordChange";

const PageTitle = dynamic(()=>import('../PageTitle/title'),
{
  ssr : false,
})

export default function ForgetPassOTP()
{

    const router = useRouter();
    const [OTPvalue, setOTPValue] = useState('');
    const [errorOTP, setErrorOTP] =useState('');
    
    const handleChangeOTPValue = (e) => 
    {
        setOTPValue(e.target.value);
    };

    const handleFormSubmit = async (e) =>
    {
        e.preventDefault();
        if(!OTPvalue)
        {
            setErrorOTP('*Enter 4 digit OTP code')
        }
        else
        {
            var checkValue = /^\d+$/ ;
            if(checkValue.test(OTPvalue))
            {
                if(OTPvalue.length < 5)
                {
                    const otp = returnOTP();
                    if (otp === parseInt(OTPvalue))
                    {
                        router.push('./PasswordChange');
                    }
                    else
                    {
                        setErrorOTP("*OTP match failed");
                    }
                }
                else
                {
                    setErrorOTP("*Invalid OTP value");
                }
            }
            else
            {
                setErrorOTP("*Invalid OTP value");
            }
        }
        
    };
    
    return (
        <>
        <PageTitle PageName = "OTP Verification"></PageTitle>
        <div className="bg-slate-800 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-white"><HeaderForPage></HeaderForPage></Link>
            <h2 className="flex items-center mb-6 text-2xl font-semibold text-white">OTP Verification</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="password" onChange={handleChangeOTPValue} name="OTPvalue" placeholder="Enter OTP code..."/>
                    <span className="text-sm text-red-600">{errorOTP && <b>{errorOTP}</b>}</span>
                </div>
                <br/>
                <div>
                    <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Verify</button>          
                </div>
                <br />
                <div className="BackToLogin">
                    <Link  className="font-medium text-primary-600 hover:underline"  href="/">Have an Account? Login..</Link>
                </div>
            </form>
        </div>
        <FooterForPage></FooterForPage>           
        </>
    )
}