import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../ValidationLogics/Authentication";
import { useEffect, useState } from "react";


export default function HeaderForPage()
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
            console.log('i am locatBlock');
            router.push('../AfterLogIn/DashBoardPage');
        }
        else 
        {

        }
        return storedUser;
    }
    return (
        <>
        <div>
            <header>
                <img className="rounded-full w-50 h-50" src="/ProjectIcon.png" alt="Wheely Icon" width={100} height={100}></img>
            </header>
        </div>
        </>
    )
}