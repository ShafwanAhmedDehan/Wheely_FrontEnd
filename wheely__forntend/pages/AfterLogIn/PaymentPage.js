import dynamic from 'next/dynamic';
import HeaderForPage from "../Layout/HeaderPage";
import FooterForPage from "../Layout/FooterPage";
import NavigationPanel from "../Layout/NavigationBar";

const PageTitle = dynamic(()=>import('../PageTitle/title'),
{
  ssr : false,
})

export default function PaymentPageDesign() 
{
    return (
        <>
        <PageTitle PageName = "Payment"></PageTitle>
        <HeaderForPage></HeaderForPage>
        <NavigationPanel></NavigationPanel>
        <br />
        <h3>Under Devlopment</h3>
        <FooterForPage></FooterForPage>
        </>
    )
}