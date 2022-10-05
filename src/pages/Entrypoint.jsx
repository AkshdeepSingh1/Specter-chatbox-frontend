import React ,{useEffect,useState} from 'react'
import { Outlet,Link,useNavigate } from 'react-router-dom'
// eslint-disable-next-line
import css from '../css/entrypoint.css'

export default function Entrypoint() {
  const [presentLogin, setPresentLogin]= useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('user'))
    {
      navigate('/');
    }
    // eslint-disable-next-line
  },[])
 
  return (
    <>
 <div className="background">
        <div className="container-fluid text-center">
            <div className="row">
               {/* /////////////////left Side column */}
                <div className="col col1">
                    <div className="inside-col1 d-flex flex-column">
                        <div className="welcome">Welcome!</div>
                        <div className="specter">Specter</div>
                        <div className="description">Connect with your friends and enjoy an emersive experience on our
                            platfrom.</div>
                    </div>
                </div>
                {/* /////////////////Right Side column */}
                <div className="col col2">
                    <div className="specter-right">Specter</div>
                    <div className="rightlastcontainer">

                        <div className="button-options">
                        
                        <Link to="login">   <button className={presentLogin?"colorthis login":"login"} onClick={()=>setPresentLogin(true)}>Log in</button></Link>
                        <Link to="register">  <button className={presentLogin?"signup":"colorthis signup"} onClick={()=>setPresentLogin(false)}>Sign up</button></Link>
                        </div>


                        <Outlet/>

                    </div>

                </div>
            </div>
        </div>
    </div>
    </>
  )
}
