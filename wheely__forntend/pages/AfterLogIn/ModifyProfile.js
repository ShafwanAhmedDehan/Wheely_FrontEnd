import Link from "next/link";
import dynamic from "next/dynamic";
import HeaderForPage from "../Layout/HeaderPage";
import FooterForPage from "../Layout/FooterPage";
import NavigationPanel from "../Layout/NavigationBar";
import axios from "axios";
import { useState, useEffect } from "react";


var storedUser;

const PageTitle = dynamic(()=>import('../PageTitle/title'),
{
  ssr : false,
})

export default function ModifyAccountPage()
{
    const [profileData, setProfileData] = useState("");
    const [type, setType] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhnNo] = useState("");
    const [AGE, setAge] = useState("");


    const HandleChangeFname = (e) => 
    {
        setFirstname(e.target.value);
    };

    const HandleChangeLname = (e) => 
    {
        setLastname(e.target.value);
    };

    const HandleChangeEmail = (e) => 
    {
        setEmail(e.target.value);
    };

    const HandleChangePhn = (e) => 
    {
        setPhnNo(e.target.value);
    };

    const HandleChangeAge = (e) => 
    {
        setAge(e.target.value);
    };

    function setvalue()
    {
        console.log('hi abul abal code');
        const DataofForm ={
            'phonenoID' : storedUser.phoneNo,
            'fname':firstName,
            'lname':lastname,
            'email':email,
            'phone':phoneNo,
            'age':parseInt(AGE) };

            return DataofForm;
    }

    useEffect(() =>
    { 
        storedUser = JSON.parse(localStorage.getItem('user'));
        async function ForViewProfile()
        {      
        try
        {
            //console.log({phoneNo});
            const response = await axios.get('http://localhost:3000/Passenger/viewProfile/'+ storedUser.phoneNo ,{withCredentials:true});
            //console.log(response.data);
            setProfileData(response.data);
            setFirstname(response.data.userInfo.fname);
            setLastname(response.data.userInfo.lname);
            setEmail(response.data.userInfo.email);
            setPhnNo(response.data.userInfo.phone);
            setAge(response.data.userInfo.age);
            if(response.data.userInfo.Sstatus == 0)
            {
            setType('Normal User');
            }
            else
            {
            setType('Student');
            }
        }
        catch(error)
        {
            console.log(error);
        }
        }
        ForViewProfile();
        /*const interval = setInterval(() => 
        {
        ForViewProfile();
        }, 15000);*/

    },[]);

    const handleFormSubmit = async (e) =>
    {
        const DataOfFrom = setvalue();
        console.log(DataOfFrom);
        ForUpdate(DataOfFrom);
    }

    async function ForUpdate(DataofForm)
    {
        try
        {
            const response = await axios.put('http://localhost:3000/Passenger/ProfileUpdate',DataofForm, {withCredentials : true}); 
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return (
        <>
        <NavigationPanel></NavigationPanel>
        <PageTitle PageName = "Modify Account"></PageTitle>
        <div className="bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <h2>Modify Account</h2>
            <form onSubmit={handleFormSubmit}>
                <div class="bg-white overflow-hidden shadow rounded-lg border">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            Modify Profile
                        </h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                            This is some old information about the user.
                        </p>
                    </div>
                    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl class="sm:divide-y sm:divide-gray-200">
                            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    First name
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="fname" name="firstName" onChange={HandleChangeFname} value={firstName} placeholder="Enter First Name..."  />
                                </dd>
                            </div>
                            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Last name
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="lname" name="lastname" onChange={HandleChangeLname} value={lastname} placeholder="Enter Last Name..."  />
                                </dd>
                            </div>
                            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Email address
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="email" name="email" onChange={HandleChangeEmail} value={email} placeholder="Enter Email Address..."  />
                                </dd>
                            </div>
                            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Phone number
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="phnNo" name="phoneNo" onChange={HandleChangePhn} value={phoneNo} placeholder="Enter Phone No...."  />
                                </dd>
                            </div>
                            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    National ID no.
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="NID" name="NID" value={profileData && profileData.userInfo.nid} placeholder="Enter NID..."  />
                                </dd>
                            </div>
                            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Age
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="number" id="age" name="AGE" onChange={HandleChangeAge} value={AGE} placeholder="Enter Your Age..."  />
                                </dd>
                            </div>
                        </dl>
                        <div className="flex items-center justify-between">
                            <div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>          
                            </div> 
                        </div>         
                    </div>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
        <FooterForPage></FooterForPage>
        </>
    )
}