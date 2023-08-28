import Link from "next/link";
import dynamic from "next/dynamic";
import HeaderForPage from "./Layout/HeaderPage";
import FooterForPage from "./Layout/FooterPage";
import { LoginEvent } from "./Layout/Alert";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "./ValidationLogics/Authentication";

const PageTitle = dynamic(()=>import('./PageTitle/title'),
{
  ssr : false,
})

let phoneNo;
let id;

export function returnValue()
{
  return phoneNo;
}

export function returnID()
{
  return id;
}

export function setValue (phone, ID)
{
  phoneNo = phone;
  id = ID;
  console.log(phoneNo);
  console.log(id);
  return phoneNo;
}

export default function Home() 
{
  const { login } = useAuth();
  const router = useRouter();
  const [errorEmailPhn, setErrorEmailPhn] =useState('');
  const [errorPass, setErrorPass] =useState('');
  const [emailphn, setEmailphn] = useState(''); 
  const [password, setPass] = useState('');

  const handleChangeEmailphn = (e) => 
  {
    setEmailphn(e.target.value);
  };

  const handleChangePass = (e) =>
  {
    setPass(e.target.value);
  };

  const handleFormSubmit = async (e) =>
  {
    e.preventDefault();
    if(!emailphn)
    {
      setErrorEmailPhn('*Please Enter Email/Phone');
    }
    else
    {
      var checkValue = /^\d+$/ ;
      if(checkValue.test(emailphn))
      {
        var PhoneNoPattaern = /(^(\+8801|8801|01))[1|3-9]{1}(\d){8}$/ ;
        if(!PhoneNoPattaern.test(emailphn))
        {
          setErrorEmailPhn('*Invalid Phone Number');
        }
        else
        {
          setErrorEmailPhn('');
        }
      }
      else
      {
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;
        if(!emailPattern.test(emailphn))
        {
          setErrorEmailPhn('*Invalid email address');
        }
        else
        {
          setErrorEmailPhn('');
        }
      }
    }
    if(!password)
    {
      setErrorPass('*Please Enter Password');
    }
    else
    {
      if(password.length < 8)
      {
        setErrorPass("*Password must be at least 8 characters");
      }
      else
      {
        setErrorPass('');
      }
    }

    if(errorEmailPhn.length === 0 && errorPass.length === 0)
    {
      await ForLogin(emailphn,password);
    } 
  };

  async function ForLogin(emailphn,password)
  {
    try
    {
      const response = await axios.post('http://localhost:3000/Passenger/login',{emailphn,password},
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      }
      );  ///login
      //console.log(reponse.data.userInfo.id);
      console.log(response.data)
      if(response.data.id == 0)
      {
        setErrorPass(response.data.error);
      }
      else
      {
        console.log("cookie: " + document.cookie);
        LoginEvent();
        console.log(response.data.userInfo.phone);
        login(response.data.userInfo.phone, document.cookie, response.data.userInfo.id);
        setValue(response.data.userInfo.phone, response.data.userInfo.id);
        router.push('./AfterLogIn/DashBoardPage');
      }
      //return reponse.data;
    }
    catch(error)
    {
      console.log(error);
    }
  }



  
  return (
    <>
      <PageTitle PageName = "Login"></PageTitle>
      <div className="bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <HeaderForPage></HeaderForPage>
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">Wheely</a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                 type="text" id="emailphn" name="emailphn" onChange={handleChangeEmailphn} placeholder="Enter Email/Phone..." />
            <span className="text-sm text-red-600">{errorEmailPhn && <b>{errorEmailPhn}</b>}</span>
          </div>
          <div>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  type="password" name="password" onChange={handleChangePass} placeholder="Enter Password..." />
            <span className="text-sm text-red-600">{errorPass && <b>{errorPass}</b>}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>          
            </div>
            <Link href="./StartupPages/ForgetProfileSearch" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</Link>
          </div>
          <div>
            <p className="text-sm font-medium text-stone-900	">
                  Don’t have an account yet? <Link href="./StartupPages/CreateAccount" className="font-medium text-primary-600 hover:underline">Sign up</Link>
            </p>
          </div>
        </form>
        </div>
        </div>
      </div>
      <FooterForPage></FooterForPage>
  </>
  )
}
