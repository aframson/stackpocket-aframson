import GameHeader from "@/components/uiComponents/GameHeader"
import AuthLayout from "@/components/uiComponents/layout/AuthLayout"
import AuthBox from "@/components/uiComponents/HelperComponents/AuthBox"
import logo from '../../public/Assets/loginAssets/logo_copy@2x.png'
import AuthInput from '@/components/uiComponents/HelperComponents/AuthInput'
import {HiUser} from 'react-icons/hi2'
import {RiLockPasswordFill} from 'react-icons/ri'
import styles from '@/styles/Home.module.css'
import {BiCheckboxSquare,BiCheckbox} from 'react-icons/bi'
import AuthButton from "@/components/uiComponents/HelperComponents/AuthButton"
import React,{useState,useEffect} from 'react'
import Link from "next/link"
import { Login } from "@/services/auth"
import {ValidateLogin} from "@/utils/validate"
import toast, { Toaster } from 'react-hot-toast';
import dynamic from "next/dynamic"
import Image from "next/image"
import cookieimage from '../../public/Assets/cookie.png'
import { useCookies } from 'react-cookie';
import { useRouter } from "next/router"

const Popup = dynamic(()=> import('react-animated-popup'),{ssr: false})




export default function Home() {

  const navigate = useRouter()


  const [isChecked,setIsChecked] = useState(false)
  const [email,setUserEmail] = useState('aframson77@gmail.com')
  const [password,setUserPassword] = useState('Salvation@77')

  
  const [cookies, setCookie,removeCookie] = useCookies(['acceptCookies','user']);
  const [getdecodedData,getData] = useState<any>({})



    
  useEffect(()=>{
    console.log('cookies:',cookies)
  },[])

  const handleClick = () => {
       setCookie('acceptCookies', 'accepted', { path: '/' });
  };



  useEffect(()=>{
    if (Object.keys(getdecodedData).length !== 0) {
      console.log('decoded data:',getdecodedData)
      if (cookies.acceptCookies === 'accepted') {
           let expiration = getdecodedData.expiry
           setCookie('user',getdecodedData, { expires:  new Date(Date.now() * expiration * 1000) });
            navigate.push(`/home/${getdecodedData.token}`)
      }
     }

  },[getdecodedData])


  const LoginUser =()=>{
    const values:any = {
      email, password
    }
    const errors = ValidateLogin(values)
    if (Object.keys(errors).length === 0 ){
        Login(values,getData)
    }else{
        console.log(errors);
        [errors].map((items,i)=>{
            // confirmPassword
            if (items.passwordRequired) {
               toast.error(items.passwordRequired as string)
            }
            if (items.passwordSpecialChar) {
                toast.error(items.passwordSpecialChar as string)
             }
             if (items.passwordNumber) {
                toast.error(items.passwordNumber as string)
             }
             if (items.email) {
                toast.error(items.email as string)
             }
             if (items.passwordCaseSensitive) {
                toast.error(items.passwordCaseSensitive as string)
             }
             if (items.username) {
                toast.error(items.username as string)
             }
             if (items.confirmPassword) {
                toast.error(items.confirmPassword as string)
             }
        })
    }

  }


  // useEffect(()=>{
  //   if (!cookies.user) {
       
  //   }else{
  //      navigate.push(`/home/${cookies.user.token}`)
  //   }
  //    console.log('user cookies:',cookies.user)
  // },[cookies.user])


  useEffect(()=>{
    if (Object.keys(cookies).length === 0) {
      setTimeout(()=>{
        setIsChecked(true)
      },2000)  
    }
    // Object.keys(cookies).forEach((cookieName) => {
    //   removeCookie('acceptCookies');
    //   removeCookie('user');
    // });  
  },[cookies.acceptCookies])

 
  return (
    <>
      <GameHeader description='Kindly enter your login details to play the game ' title='Login'  favicon=''/>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
   <Popup   visible={isChecked} onClose={() => setIsChecked(!isChecked)}>
    <div className={styles.cookie}>
      <center>
         <div className={styles.imgbox}>
           <Image src={cookieimage} className={styles.cookieimage} alt={""}/>
        </div>
      </center>
         <p style={{paddingTop:20,textAlign:'center',color:'gray',fontSize:13}} className={styles.pop} >
          Our website uses cookies to store your login information when you select 
          do not share with others. By continuing to use our website and selecting 
          'Keep me logged in,' you acknowledge and agree to our use of cookies to store your login information."
        </p>
        <div style={{width:'100%',paddingTop:30}} className={styles.actionbox}>
          <button onClick={()=>{
            setIsChecked(!isChecked)
            handleClick()
            }} className={styles.acc}>Agree</button>
        </div>
    </div>
  </Popup>
      <AuthLayout>
           <AuthBox style2={{marginTop:230}} title="Login" image={logo}>
               <div style={{marginTop:130}}>
               <div className={styles.inpboxmain}>
                 <AuthInput value={email} onChange={(e:any)=> {
                  setUserEmail(e.target.value)
                  }} icon={<HiUser style={{marginTop:2}} color="#002D6E" size={23} />} label="Username/Email" placeholder="UserName/Email" />
               </div>
               <div className={styles.inpboxmain}>
                 <AuthInput value={password} type="password" onChange={(e:any)=>setUserPassword(e.target.value)} icon={<RiLockPasswordFill style={{marginTop:3}} color="#002D6E" size={20} />} label="Password" placeholder="Password" />
               </div>
               <div className={styles.rembox}>
                 <div onClick={()=>setIsChecked(!isChecked)} className={styles.rem}>
                    {isChecked?<BiCheckboxSquare size={20} color="white"/>:<BiCheckbox size={20} color="white"/>}
                    <div className={styles.chetxt}>Keep me Logged in</div>
                 </div>
                 <div className={styles.forget}>Forget Password</div>
               </div>

               <center style={{marginTop:50}}>
                <AuthButton onClick={()=>LoginUser()} label="Login" />
                <div className={styles.account}>Don't have an Account? <Link href={'/register'}><span className={styles.sign}>Sign Up</span> </Link></div>
               </center>


               </div>
           </AuthBox>
           {Object.keys(cookies).length === 0?(
              <div className={styles.cookieFooter}>
              <div className={styles.imgbox}>
                <Image src={cookieimage} className={styles.cookieimage} alt={""}/>
              </div>
              <div className={styles.cooktxt}>
              Our website uses cookies to store your login information when you select 'Keep me logged in.' This means that your username and password will be saved on your device, 
              allowing you to remain logged in even after you close your browser or shut down your device. While this can be convenient, it also means that anyone who has 
              access to your device can log into your account. To ensure the security of your account, we recommend that you only select 'Keep me logged in' 
              on devices that you trust and do not share with others. 
              By continuing to use our website and selecting 'Keep me logged in,' you acknowledge and agree to our use of cookies to store your login information.
              </div>
              <div className={styles.actionbox}>
                  <button onClick={handleClick} style={{marginTop:20}} className={styles.acc}>Agree</button>
              </div>
              </div>
           ):null}
      </AuthLayout>

  
    </>
  );
}


