import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../ValidationLogics/Authentication";
import { useEffect, useState } from "react";
import { returnID } from "..";
import axios from "axios";

let FileName = "";

function SetFileName (File)
{
    FileName=File;
}

export function returnFileName()
{
    return FileName;
}

export default function NavigationPanel()
{
    const router = useRouter();
    const { user, login, logout } = useAuth();

    useEffect(() => {
        checkSession();
        const interval = setInterval(() => {
            checkSession();
        }, 1000);
      
          return () => {
            clearInterval(interval);
          };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('hi i am logout');
            logout();
        }, 1800000);
        return () => {
            clearInterval(interval);
          };
    }, []);

    function checkSession()
    {
        var storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) 
        {
            login(storedUser.phoneNo, storedUser.cookie, storedUser.id);
            console.log(storedUser.phoneNo);
            console.log(storedUser.id);
            console.log('i am locatl001');
        }
        else 
        {
            router.push('/')
        }
        return storedUser;
    }

    const ID = returnID();
    const [ppfilename, setPpfilename] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try 
            {
                const response = await axios.get('http://localhost:3000/Passenger/Displayimage/' + checkSession().id, { withCredentials: true });
                console.log(response.data[0].DP.ppfilename);
                setPpfilename(response.data[0].DP.ppfilename);
                SetFileName(response.data[0].DP.ppfilename);
                let PicFileName = response.data[0].DP.ppfilename;
                localStorage.setItem('filename', PicFileName);
            } 
            catch (error) 
            {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
        <nav className="bg-zinc-300	 border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
                <img src="/ProjectIcon.png" className="h-12 mr-5" alt="Wheely Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap">Wheely</span>
            </a>
            <div class="flex items-center md:order-2">
                <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                    <img className="w-10 h-8 rounded-full" src={'http://localhost:3000/Passenger/getImage/'+ppfilename} alt="user photo"></img>
                </button>
            </div>
            <div className="bg-zinc-300	items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-zinc-300">
                <li>
                    <Link href="../AfterLogIn/DashBoardPage" className="block py-2 pl-3 pr-4 text-lg text-gray-900 font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Home</Link>
                </li>
                <li>
                    <Link href="../AfterLogIn/ViewProfilePage" className="block py-2 pl-3 pr-4 text-lg text-gray-900 font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Profile</Link>
                </li>
                <li>
                    <Link href="../AfterLogIn/Notification" className="block py-2 pl-3 pr-4 font-bold text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Notification</Link>
                </li>
                <li>
                    <Link href="/" onClick={logout} className="block py-2 pl-3 pr-4 font-bold text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 md:p-0">Logout</Link>
                </li>
                </ul>
            </div>
            </div>
            </nav>
        </>
    )
}

