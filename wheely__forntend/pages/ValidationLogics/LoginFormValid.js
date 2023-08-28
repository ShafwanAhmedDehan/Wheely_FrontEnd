import { useState } from "react";

const [errorEmailPhn, setErrorEmailPhn] = useState('');
const [Emailphn, setEmailphn] = useState('');

export function loginValidation()
{
    
    //const [pass, setPass] = useState('');
    

    const handleChangeEmailphn = (e) => 
    {
        setEmailphn(e.target.value);
    };

    /*const handleChangePass = (e) =>
    {
        setPass(e.target.value);
    };*/

    

    if(!Emailphn || !pass)
    {
        setErrorEmailPhn('Please Eneter Both Fields');
    }
    else
    {
        setErrorEmailPhn('Good');
    }
}

export function FormSubmit01 ()
{
    const handleFormSubmit = (e) =>
    {
        e.preventDefault();
    };
}