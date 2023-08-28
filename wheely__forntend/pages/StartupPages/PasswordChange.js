import HeaderForPage from "../Layout/HeaderPage";
import FooterForPage from "../Layout/FooterPage";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PassowordChangedEvent } from "../Layout/Alert";
import { returnPhnNum } from "./ForgetProfileSearch";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

const PageTitle = dynamic(()=>import('../PageTitle/title'),
{
  ssr : false,
})

export default function PasswordChangeFromForget()
{
    const router = useRouter();
    const [newPassword, setNewPassword] = useState('');
    const [errorPass, setErrorPass] =useState('');
    const [RetypenewPassword, setRetypePass] = useState('');
    const phoneNo = returnPhnNum();

    const handleChangeNewPass = (e) => 
    {
        setNewPassword(e.target.value);
    };

    const handleChangeRepass = (e) => 
    {
        setRetypePass(e.target.value);
    };

    function setvalue()
    {
        const DataofForm ={
        'phone': phoneNo,
        'newpassword': newPassword,
        'confirmpassword': RetypenewPassword };
        return DataofForm;
    }

    const handleFormSubmit = async (e) =>
    {
        e.preventDefault();
        if(!newPassword || !RetypenewPassword)
        {
            setErrorPass('*Please Enter Password');
        }
        else
        {
            if(newPassword.length < 8 || RetypenewPassword.length < 8)
            {
                setErrorPass("*Password must be at least 8 characters");
            }
            else
            {
                setErrorPass ('');
            }
        }   
        
        if (setErrorPass.length === 0)
        {  
            const value = setvalue();
            console.log(value);
            if (newPassword.length != 0 && RetypenewPassword.length != 0 && newPassword === RetypenewPassword)
            {
                PassowordChangedEvent();
                const response = await axios.post('http://localhost:3000/Passenger/Forgetpassword',value); 
                console.log(response.data);
                router.push('/');
            }
            else
            {
                setErrorPass("Password Not Matched");
            }
        }
    };

    return (
        <>
        <PageTitle PageName = "Reset Password"></PageTitle>
        <div className="bg-slate-800 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-white"><HeaderForPage></HeaderForPage></Link>
            <h2 className="flex items-center mb-6 text-2xl font-semibold text-white">Change Password</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="password" name="newPassword" onChange={handleChangeNewPass} placeholder="Enter New Password..." autoFocus />
                    <span className="text-sm text-red-600">{errorPass && <b>{errorPass}</b>}</span>
                </div>
                <br />
                <div>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="password" name="RetypenewPassword" onChange={handleChangeRepass} placeholder="Re-type Passoword..." />
                    <span className="text-sm text-red-600">{errorPass && <b>{errorPass}</b>}</span>
                </div>
                <br />
                <div>
                    <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset Password</button>          
                </div>  
                <br/>              
                <div>
                    <Link  className="font-medium text-primary-600 hover:underline"  href="/">Have an Account? Login..</Link>
                </div> 
            </form>
        </div>
        <FooterForPage></FooterForPage>           
        </>
    )
}