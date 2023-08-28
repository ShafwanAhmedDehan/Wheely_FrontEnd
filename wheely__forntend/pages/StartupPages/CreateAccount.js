import Link from "next/link";
import dynamic from "next/dynamic";
import HeaderForPage from "../Layout/HeaderPage";
import { useState } from "react";
import FooterForPage from "../Layout/FooterPage";
import axios from "axios";
import { RegiEvent } from "../Layout/Alert";
import { useRouter } from "next/router";

const PageTitle = dynamic(()=>import('../PageTitle/title'),
{
  ssr : false,
})

export default function CreateAccountPage()
{
    const router = useRouter();
    const [firstName, setfname] = useState(''); 
    const [lastName, setlname] = useState(''); 
    const [email, setemail] = useState(''); 
    const [phone, setphone] = useState(''); 
    const [nid, setNID] = useState(''); 
    const [password, setpassword] = useState(''); 
    const [gender, setgender] = useState(''); 
    const [age, setage] = useState('');
    const [confirmPassword, setCpass] = useState('');

    const [errorFname, setErrorFname] =useState('');
    const [errorLname, setErrorLname] =useState('');
    const [errorEmail, setErrorEmail] =useState('');
    const [errorPhn, setErrorPhn] =useState('');
    const [errorNID, setErrorNID] =useState('');
    const [errorPass, setErrorPass] =useState('');
    const [errorGender, setErrorGender] =useState('');
    const [errorAge, setErrorAge] =useState('');

    const handleChangefname= (e) => 
    {
        setfname(e.target.value);
    };
    const handleChangelname= (e) => 
    {
        setlname(e.target.value);
    };
    const handleChangeemail= (e) => 
    {
        setemail(e.target.value);
    };
    const handleChangephone= (e) => 
    {
        setphone(e.target.value);
    };
    const handleChangenid= (e) => 
    {
        setNID(e.target.value);
    };
    const handleChangepass= (e) => 
    {
        setpassword(e.target.value);
    };
    const handleChangegender= (e) => 
    {
        setgender(e.target.value);
    };
    const handleChangeage= (e) => 
    {
        setage(e.target.value);
    };
    const handleChangeConfirmpassword= (e) => 
    {
        setCpass(e.target.value);
    }

    function setvalue()
    {
        const DataofForm ={
        'fname':firstName,
        'lname':lastName,
        'email':email,
        'phone':phone,
        'nid':nid,
        'password':password,
        'gender':gender,
        'age':parseInt(age) };
        return DataofForm;
    }

    const handleFormSubmit = async (e) =>
    {
        e.preventDefault();
        if (!firstName)
        {
            setErrorFname('*Enter First Name')
        }
        else
        {
            var NamePattern = /^[A-Za-z\s]*$/ ;
            if(!NamePattern.test(firstName))
            {
                setErrorFname('*Invalid First Name');
            }
            else
            {
                if(firstName.length < 50)
                {
                    setErrorFname('');
                }
                else
                {
                    setErrorFname('*Maximum Lenght is 50');
                }
            }
        }

        if (!lastName)
        {
            setErrorLname('*Enter Last Name')
        }
        else
        {
            var NamePattern = /^[A-Za-z\s]*$/ ;
            if(!NamePattern.test(lastName))
            {
                setErrorLname('*Invalid Last Name');
            }
            else
            {
                if(lastName.length < 30)
                {
                    setErrorLname('');
                }
                else
                {
                    setErrorLname('*Maximum Lenght is 30');
                }
            }
        }

        if (!email)
        {
            setErrorEmail('*Enter your email address')
        }
        else
        {
            var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;
            if(!emailPattern.test(email))
            {
                setErrorEmail('*Invalid Email Address');
            }
            else
            {
                if(email.length <= 100)
                {
                    setErrorEmail('');
                }
                else
                {
                    setErrorEmail('*Maximum Lenght is 100');
                }
            }
        }

        if (!phone)
        {
            setErrorPhn('*Enter your phone number')
        }
        else
        {
            var PhoneNoPattaern = /(^(\+8801|8801|01))[1|3-9]{1}(\d){8}$/ ;
            if(!PhoneNoPattaern.test(phone))
            {
                setErrorPhn('*Invalid Email Address');
            }
            else
            {
                if(phone.length < 13)
                {
                    setErrorPhn('');
                }
                else
                {
                    setErrorPhn('*Maximum Lenght is 11');
                }
            }
        }

        if (!nid)
        {
            setErrorNID('*Enter your NID no.');
        }
        else
        {
            var checkValue = /^\d+$/ ;
            if(!checkValue.test(nid))
            {
                setErrorNID('*Invalid NID no.');
            }
            else
            {
                if(nid.length < 21)
                {
                    setErrorNID('');
                }
                else
                {
                    setErrorNID('*Maximum Lenght is 21');
                }
            }
        }

        if (!password)
        {
            setErrorPass('*Enter Password must be');
        }
        else
        {
            if(password.length < 8)
            {
                setErrorPass('*Password must be at least 8 characters');
            }
            else
            {
                if(password === confirmPassword)
                {
                    setErrorPass('*Does not match');
                }
                else
                {
                    setErrorPass('');
                }
            }
        }

        if (!gender)
        {
            setErrorGender('*Select your gender');
        }
        else
        {
            if(gender.length < 10)
            {
                setErrorGender('');
            }
            else
            {
                setErrorGender('*Gender must be at least 10 characters');
            }
        }

        if (!age)
        {
            setErrorAge('*Enter your age');
        }
        else
        {
            if(age > 12)
            {
                setErrorAge('');
            }
            else
            {
                setErrorAge('*Age must be at least 12 years old');
            }
        }
        if(errorFname.length == 0 && errorLname.length == 0 && errorEmail.length == 0 && errorPhn == 0 && errorNID==0 && errorPass==0 && errorGender==0 && errorAge==0)
        {
            const data = setvalue();
            await ForSignUp(data);
        }
    };

    async function ForSignUp(DataofForm)
    {
        try
        {
            const response = await axios.post('http://localhost:3000/Passenger/SignUp',DataofForm); 
            console.log(response.data);
            RegiEvent();
            router.push('/');
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return (
        <>
        <PageTitle PageName = "Create Account"></PageTitle>
        <div className="bg-state-800"><br /><br /> <br /><br /> <br /><br /></div>
        <div className="bg-slate-800 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-white"><HeaderForPage></HeaderForPage></Link>
            <h2 className="flex items-center mb-6 text-2xl font-semibold text-white">Sign up</h2>
            <form onSubmit={handleFormSubmit}>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input id="Fname" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-600 peer" type="text" name="firstName" placeholder="" onChange={handleChangefname}  />
                    <label for="Fname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                    <span className="text-sm text-red-600">{errorFname && <b>{errorFname}</b>}</span>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input id="Lname" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" type="text" name="lastName" onChange={handleChangelname} placeholder=""/>
                    <label for="Lname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                    <span className="text-sm text-red-600">{errorLname && <b>{errorLname}</b>}</span>
                </div>
            </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input id="Email01" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-600 peer" type="text" name="email" onChange={handleChangeemail} placeholder=""  />
                    <label for="Email01" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    <span className="text-sm text-red-600">{errorEmail && <b>{errorEmail}</b>}</span>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input id="Phone" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-600 peer" type="tel" name="phone" onChange={handleChangephone} placeholder="" />
                    <label for="Phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone No.</label>
                    <span className="text-sm text-red-600">{errorPhn && <b>{errorPhn}</b>}</span>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input id="NID" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-600 peer" type="number" name="nid" onChange={handleChangenid} placeholder="" />
                    <label for="NID" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">National Identity No.</label>
                    <span className="text-sm text-red-600">{errorNID && <b>{errorNID}</b>}</span>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input id="Pass" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-600 peer" type="password" name="password" onChange={handleChangepass} placeholder=""  />
                        <label for="Pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        <span className="text-sm text-red-600">{errorPass && <b>{errorPass}</b>}</span>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input id="CPass" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-600 peer" type="password" name="confirmPassword" onChange={handleChangeConfirmpassword} placeholder=""  />
                        <label for="CPass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                        <span className="text-sm text-red-600">{errorPass && <b>{errorPass}</b>}</span>
                    </div>
                </div>
                <div>
                    <h2 className="mb-4 font-semibold text-white">Gender</h2>
                    <ul className="items-center w-full text-sm font-medium bg-white border border-gray-200 rounded-lg sm:flex text-white">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <input id="male" type="radio" name="gender" onChange={handleChangegender} value="Male" className="w-4 h-4 text-blue-600 bg-gray-400 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                            <label for="male" className="w-full py-3 ml-2 text-sm font-medium text-gray-900">Male </label>
                        </div>
                    </li>
                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input id="Fmale" type="radio" name="gender" onChange={handleChangegender} value="Female" className="w-4 h-4 text-blue-600 bg-gray-400 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                            <label for="Fmale" className="w-full py-3 ml-2 text-sm font-medium text-gray-900">Female </label>
                        </div>
                    </li>
                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input id="other" type="radio" name="gender" onChange={handleChangegender} value="Other" className="w-4 h-4 text-blue-600 bg-gray-400 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                            <label for="other" className="w-full py-3 ml-2 text-sm font-medium text-gray-900">Other </label>
                        </div>
                    </li>
                    </ul>
                    <span className="text-sm text-red-600">{errorGender && <b>{errorGender}</b>}</span>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input id="AGE" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white focus:outline-none focus:ring-0 focus:border-blue-600 peer" type="number" name="age" onChange={handleChangeage} placeholder=""  />
                    <label for="AGE" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
                    <span className="text-sm text-red-600">{errorAge && <b>{errorAge}</b>}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                    </div>
                    <Link href="/" className="text-sm font-medium text-primary-600 hover:underline">Have an Account? Login..</Link>
                </div>
                <br/> <br/> <br/> <br/> <br/> <br/>
            </form>
        </div>
        <FooterForPage></FooterForPage>
        </>
    )
}
