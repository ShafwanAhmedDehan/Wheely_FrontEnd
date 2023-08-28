import HeaderForPage from "../Layout/HeaderPage";
import FooterForPage from "../Layout/FooterPage";
import Link from "next/link";
import dynamic from "next/dynamic";
import { OTPsendEnvent } from "../Layout/Alert";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const PageTitle = dynamic(()=>import('../PageTitle/title'),
{
  ssr : false,
})

let OTP ;
let phoneNumber;



export function returnOTP()
{
  return OTP;
}

export function returnPhnNum()
{
  return phoneNumber;
}

export function setOTP (otpcode, phonenumber)
{
    phoneNumber = phonenumber;  
    console.log(phoneNumber);     
    OTP = otpcode;
    console.log(OTP);
    return OTP;
}

export default function ForgetPassProfileSearchPage()
{

    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');
    const [errorEmailPhn, setErrorEmailPhn] =useState('');
    const [errorSearchValue, setErrorSearchValue] = useState('');
    const [OTP, setOTP] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    
    const handleChangeSearchValue = (e) => 
    {
        setSearchValue(e.target.value);
    };

    const handleFormSubmit = async (e) =>
    {
        e.preventDefault();
        if(!searchValue)
        {
            setErrorSearchValue('Enter valid Email/Phone');
        }
        else
        {
            var checkValue = /^\d+$/ ;
            if(checkValue.test(searchValue))
            {
                var PhoneNoPattaern = /(^(\+8801|8801|01))[1|3-9]{1}(\d){8}$/ ;
                if(!PhoneNoPattaern.test(searchValue))
                {
                    setErrorSearchValue('*Invalid Phone Number');
                }
                else
                {
                    setErrorSearchValue('');
                }
            }
            else
            {
                var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;
                if(!emailPattern.test(searchValue))
                {
                    setErrorSearchValue('*Invalid email address');
                }
                else
                {
                    setErrorSearchValue('');
                }
            }
        }

        if(errorSearchValue.length === 0 )
        {
            await ForStudentApplication(searchValue);
        }
    };

    async function ForStudentApplication(DataofForm)
    {
        try
        {
            const response = await axios.get('http://localhost:3000/Passenger/ProfileSearch/'+DataofForm); 
            console.log(response.data);
            if(response.data.id == 0)
            {
                setErrorEmailPhn('*No User Found. Try again !');
            }
            else
            {
                OTPsendEnvent();
                const OTPvalue = await axios.post('http://localhost:3000/Passenger/OTPsend/'+searchValue)
                console.log(OTPvalue.data);
                console.log(OTPvalue.data.otpCode);
                setOTP(OTPvalue.data.otpCode,response.data.phone);
                setPhoneNumber(OTPvalue.data.phone);
                setOTP(OTPvalue.data.otpCode);
                router.push('./OtpEnterForgetPass');
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return (
        <>
        <PageTitle PageName = "Search Profile"></PageTitle>
        <div className="bg-slate-800 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-white"><HeaderForPage></HeaderForPage></Link>
            <h2 className="flex items-center mb-6 text-2xl font-semibold text-white">Search Your Profile</h2>
            <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
            <div>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="text" name="searchValue" onChange={handleChangeSearchValue} placeholder="Enter email/Phone..."/>
                <span className="text-sm text-red-600">{errorEmailPhn && <b>{errorEmailPhn}</b>}</span>
                <span className="text-sm text-red-600">{errorSearchValue && <b>{errorSearchValue}</b>}</span>
            </div>
                <div>
                    <br />
                    <button className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" type="submit">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>Search
                    </button>
                </div>
            </form>
        </div>
        <FooterForPage></FooterForPage>
        </>
    )
}