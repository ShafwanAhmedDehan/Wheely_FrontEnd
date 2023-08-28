import dynamic from 'next/dynamic';
import FooterForPage from "../Layout/FooterPage";
import NavigationPanel from "../Layout/NavigationBar";
import { useState, useEffect } from 'react';
import axios from 'axios';

const PageTitle = dynamic(()=>import('../PageTitle/title'),
{
  ssr : false,
})


export default function NotificationPage() 
{
    const [notification, setNotify] = useState([]);
    useEffect(() =>
    {
        var storedUser = JSON.parse(localStorage.getItem('user'));
        async function Notification()
        {      
        try
        {
            const response = await axios.get('http://localhost:3000/Passenger/Notification/'+ storedUser.id ,{withCredentials:true});
            setNotify(response.data);
        }
        catch(error)
        {
            console.log(error);
        }
        }
        const interval = setInterval(() => 
        {
            Notification();
        }, 1000);

    },[]);

    return (
        <>
        <PageTitle PageName = "Notification"></PageTitle>
        <NavigationPanel></NavigationPanel>
        <div className="bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {notification.map((notify, index) => (
        <div id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                <span class="sr-only">Check icon</span>
            </div>
            <div class="ml-3 text-sm font-normal">{notify.notification}</div>
        </div>
        ))}
        
        </div>
        <FooterForPage></FooterForPage>
        </>
    )
}