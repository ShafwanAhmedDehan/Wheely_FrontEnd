import dynamic from 'next/dynamic';
import HeaderForPage from "../Layout/HeaderPage";
import FooterForPage from "../Layout/FooterPage";
import { StudentEvent } from '../Layout/Alert';
import NavigationPanel from "../Layout/NavigationBar";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


const PageTitle = dynamic(()=>import('../PageTitle/title'),
{
  ssr : false,
})

var storedUser;

export default function StudentApply()
{
    const router = useRouter();
    const [studentId, setSID] = useState(''); 
    const [institutionName, setInsName] = useState('');
    const [educationLevel, seteduLevel] = useState(''); 

    const [errorID,  setErrorID] = useState('');
    const [errorInstName,  setErrorInstName] = useState('');
    const [errorEduLvl, setErrorEduLvl] = useState('');
    
    useEffect(() => 
    {
        storedUser = JSON.parse(localStorage.getItem('user'));   
    }, []);

    const handleChangeSID = (e) => 
    {
        setSID(e.target.value);
    };
    const handleChangeInsName = (e) => 
    {
        setInsName(e.target.value);
    };
    const handleChangeEduLevel = (e) => 
    {
        seteduLevel(e.target.value);
    };

    function setvalue()
    {
        const DataofForm ={
        'instname':institutionName,
        'studentid':studentId,
        'level':educationLevel};
        return DataofForm;
    }

    const handleFormSubmit = async (e) =>
    {
        e.preventDefault();
        if(!studentId)
        {
            setErrorID('*Enter Student ID');
        }
        else
        {
            if(studentId.length < 31)
            {
                setErrorID('');
            }
            else
            {
                setErrorID("*Student ID must be at least 30 characters");
            }
        }

        if(!institutionName)
        {
            setErrorInstName('*Enter Instution Name');
        }
        else
        {
            if(institutionName.length <= 100)
            {
                setErrorInstName('');
            }
            else
            {
                setErrorInstName("*Institution Name must be at least 100 characters");
            }
        }

        if(!educationLevel)
        {
            setErrorEduLvl('*Enter Education Level')
        }
        else
        {
            if(institutionName.length <= 30)
            {
                setErrorEduLvl('');
            }
            else
            {
                setErrorEduLvl("*Education Level must be at least 30 characters");
            }
        }

        if(errorID.length === 0 && errorInstName.length === 0 && errorEduLvl.length === 0)
        {
            const data = setvalue();
            await ForStudentApplication(data);
        }  
    };

    async function ForStudentApplication(DataofForm)
    {
        try
        {
            const response = await axios.post('http://localhost:3000/Passenger/StudentApplication/'+storedUser.phoneNo,DataofForm, {withCredentials : true}); 
            console.log(response.data);
            StudentEvent();
            router.push('./DashBoardPage');
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return (
        <>
        <PageTitle PageName = "Student Apply"></PageTitle>
        <NavigationPanel></NavigationPanel>
        <div className="bg-slate-800 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
             <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Student Application</h2>
            <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
                <div>
                    <input className="bg-gray-50 border border-cyan-700 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="text" name="studentId" onChange={handleChangeSID}  placeholder="Enter Student ID..."/>
                    <span className="text-sm text-red-600">{errorID && <b>{errorID}</b>}</span>
                </div>
                <div>
                    <input className="bg-gray-50 border border-cyan-700 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="text" name="institutionName" onChange={handleChangeInsName} placeholder="Enter Institution Name..." />
                    <span className="text-sm text-red-600">{errorInstName && <b>{errorInstName}</b>}</span>
                </div>
                <div>
                    <input className="bg-gray-50 border border-cyan-700 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="text" id="educationLevel" onChange={handleChangeEduLevel} placeholder="Enter Education Level..." />
                    <span className="text-sm text-red-600">{errorEduLvl && <b>{errorEduLvl}</b>}</span>
                </div>
                <div>
                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>          
                </div>
            </form>
        </div>
        </div>
        </div>
        <FooterForPage></FooterForPage>
        </>
    )
}