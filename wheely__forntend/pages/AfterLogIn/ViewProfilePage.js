import HeaderForPage from "../Layout/HeaderPage";
import FooterForPage from "../Layout/FooterPage";
import dynamic from "next/dynamic";
import axios from "axios";
import { returnValue } from "..";
import { useEffect, useState } from "react";
import { returnFileName } from "../Layout/NavigationBar";
import NavigationPanel from "../Layout/NavigationBar";

const PageTitle = dynamic(()=>import('../PageTitle/title'),
{
  ssr : false,
})


var FileName;

export default function ViewProfile()
{
  const [profileData, setProfileData] = useState("");
  const [type, setType] = useState("");
  useEffect(() =>
  { 
    var storedUser = JSON.parse(localStorage.getItem('user'));
    FileName = (localStorage.getItem('filename'));
    async function ForViewProfile()
    {      
      try
      {
        //console.log({phoneNo});
        const response = await axios.get('http://localhost:3000/Passenger/viewProfile/'+ storedUser.phoneNo ,{withCredentials:true});
        //console.log(response.data);
        setProfileData(response.data);
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
    const interval = setInterval(() => 
    {
      ForViewProfile();
    }, 1000);

  },[]);

    return (
       <>
        <PageTitle PageName = "View Profile"></PageTitle>
        <NavigationPanel></NavigationPanel>
        <div className="bg-slate-800 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div
            class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
            <div class="rounded-t-lg h-32 overflow-hidden">
                <img class="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'></img>
            </div>
            <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <img class="object-cover object-top w-full" src={"http://localhost:3000/Passenger/getImage/"+FileName} alt='Profile Picture'></img>
            </div>
            <div class="text-center mt-2">
                <h2 class="font-semibold">{profileData && profileData.userInfo.fname} {profileData && profileData.userInfo.lname}</h2>
            </div>
            <div class="text-center mt-2">
                <h2 class="font-semibold">{type}</h2>
            </div>
        </div>
        <br />
        <div class="bg-white overflow-hidden shadow rounded-lg border">
            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                    User Profile
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    This is some information about the user.
                </p>
            </div>
            <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl class="sm:divide-y sm:divide-gray-200">
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            First name
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {profileData && profileData.userInfo.fname}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Last name
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {profileData && profileData.userInfo.lname}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Email address
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {profileData && profileData.userInfo.email}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Phone number
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {profileData && profileData.userInfo.phone}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Gender
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {profileData && profileData.userInfo.gender}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            National ID no.
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {profileData && profileData.userInfo.nid}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Age
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {profileData && profileData.userInfo.age}
                        </dd>
                    </div>
                </dl>
            </div>
          </div>
          <br/><br/><br></br>
       </div>
        <FooterForPage></FooterForPage>
       </> 
    )
} 


