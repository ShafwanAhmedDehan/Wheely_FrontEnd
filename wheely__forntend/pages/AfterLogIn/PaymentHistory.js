import dynamic from 'next/dynamic';
import HeaderForPage from "../Layout/HeaderPage";
import FooterForPage from "../Layout/FooterPage";
import NavigationPanel from "../Layout/NavigationBar";
import { useEffect, useState } from 'react';
import axios from 'axios';

const PageTitle = dynamic(()=>import('../PageTitle/title'),
{
  ssr : false,
})

export default function PaymentHistoryPage() 
{
  const [PaymentHistory, setHistory] = useState([]);
  useEffect(() =>
  {
    var storedUser = JSON.parse(localStorage.getItem('user'));
    async function PaymentHistory()
    {      
      try
      {
        const response = await axios.get('http://localhost:3000/Passenger/PaymentHistory/'+ storedUser.phoneNo ,{withCredentials:true});
        setHistory(response.data);
      }
      catch(error)
      {
        console.log(error);
      }
    }
    const interval = setInterval(() => 
    {
      PaymentHistory();
    }, 1000);

  },[]);

  return (
        <>
        <PageTitle PageName = "Payment History"></PageTitle>
        <NavigationPanel></NavigationPanel>
        <div className="bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th className='px-6 py-3'>SN</th>
            <th className='px-6 py-3'>Start Point</th>
            <th className='px-6 py-3'>Destination</th>
            <th className='px-6 py-3'>Payment</th>
          </tr>
          </thead>
          <tbody>
            {PaymentHistory.map((payment, index) => (
                <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700' key={index}>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{index + 1}</td>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{payment.startPoint}</td>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{payment.destinationPoint}</td>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{payment.payment}</td>
                </tr>
          ))}
          </tbody>
        </table> 
        </div>
        <FooterForPage></FooterForPage>
        </>
    )
}