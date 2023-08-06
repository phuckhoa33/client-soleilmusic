import { useEffect, useState } from 'react';
import '../scss/authentication.css';
import * as $ from 'jquery';
import { GoogleOAuthProvider } from '@react-oauth/google';  
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import {LoginSocialFacebook} from 'reactjs-social-login';
import {FacebookLoginButton} from 'react-social-login-buttons';
import { login, register } from '../api/store';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import generateRandomCode from '../extra/generate_random_code';
import ClipLoader from "react-spinners/ClipLoader";
import { Spinner } from 'react-bootstrap';
const cookies = new Cookies();

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

export const Authentiation = () => {
    // Context of User
    const {user, setUser,isLoggedIn, setIsLoggedIn} = useUserContext();
    // State for Spinner loading
    const [loading, setLoading] = useState(false);
    // Service of React Router Dom
    const navigate = useNavigate();
    // This useState is used for values of two form about register and login
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [formRegister, setFormRegister] = useState({
        emailRegister: "",
        passwordRegister: ""
    })
    // This useState so that confirm value in confirm password in register
    const [confirmPassword, setConfirmPassword] = useState("");
    

    const {email, password} = form;
    const {emailRegister, passwordRegister} = formRegister;

    useEffect(() => {
        $("#signup-box-link").click(function(){
            $(".email-login").fadeOut(100);
            $(".email-signup").delay(100).fadeIn(100);
            $("#login-box-link").removeClass("active");
            $("#signup-box-link").addClass("active");
        });
        $("#login-box-link").click(function(){
            $(".email-login").delay(100).fadeIn(100);;
            $(".email-signup").fadeOut(100);
            $("#login-box-link").addClass("active");
            $("#signup-box-link").removeClass("active");
        });

        if(user['email']){
            navigate('/');
        }
    }, [])
    useEffect(() => {
        $(".email-signup").hide();
    }, [])
    // All functions about handle change, confirm value

    const handleChange = (e, setFunctionality, functionality) => {
        setFunctionality({...functionality, [e.target.name]: e.target.value});
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }



    // Authentication Path: Login, Login with social media account and Register
    const handleSuccessOauth = (credentialResponse) => {
        var decoded = jwt_decode(credentialResponse.credential);
        const loginWithSocial = {
            email: decoded.email,
            password: generateRandomCode(20),
            first_name: decoded.family_name,
            last_name: decoded.given_name,
            image: decoded.picture
        }
        handleSubmitLogin(loginWithSocial, "social");
    }

    const handleErrorOauth = (error) => {
        console.log(error);
    }

    const handleSubmitLogin = async (formLogin, type) => {
        if(type==="social" || handleEmptyValue("login") ){
            formLogin.type = type;
            setLoading(true);
            const {data} = await login(formLogin);
            setLoading(false);
            const message = data.result.message;
            hanldeCookies(data);
            if(data.result.statusCode===202){
                toast.success(message, {position: 'top-center'});
                navigate('/');
                setIsLoggedIn("Logout");
            }
            else {
                toast.error(message, {position: 'top-center'});
            }
        }
    }

    const handleSubmitRegister = async(e) => {
        e.preventDefault();
        if(handleEmptyValue("register")){
            if(confirmPassword!==passwordRegister){
                toast.error("Mật khẩu không khớp", {position: 'top-center'});
                return;
            }
            const formValue = {
                email: formRegister.emailRegister,
                password: formRegister.passwordRegister,
                first_name: "",
                last_name: "",
                image: ""
            }
            setLoading(true);
            const {data} = await register(formValue);
            setLoading(false);
            hanldeCookies(data);
            if(data.result.statusCode!==502){
                toast.success(data.result.message, {position: 'top-center'});
                navigate('/');
                setIsLoggedIn("Logout");
            }
            else {
                toast.error(data.result.message, {position: 'top-center'});
            }
        }
    }

    const hanldeCookies = (data) => {
        setUser(data.result.user);
        cookies.set('token', data.result.access_token);
        cookies.set('user', data.result.user);
    }

    const handleEmptyValue = (type) => {
        if(type==="login"){
            if(password==="" || email==="" ){
                toast.error("Bạn không được để trống các field", {position: 'top-center'});
                return false;
            }

        }
        else{
            if(passwordRegister==="" || emailRegister===""){
                toast.error("Bạn không được để trống các field", {position: 'top-center'});
                return false;
            }
        }
        return true;
    }

    return (
        <div className='empty_layout'>

            <div className="login-box">
                <div className="lb-header">
                <a href="#" className="active" id="login-box-link">Đăng nhập</a>
                <a href="#" id="signup-box-link">Đăng ký</a>
                </div>
                <div className="social-login" >
                    <LoginSocialFacebook
                        appId='301472635607688'
                        classNameName='fa-lg'
                        onResolve={handleSuccessOauth}
                        onReject={handleErrorOauth}
                    >
                        <FacebookLoginButton/>
                    </LoginSocialFacebook>
                    <GoogleOAuthProvider clientId="876803727141-43fc5rk4thdnho4ol76gdeodbmdfm6jf.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={handleSuccessOauth}
                            onError={handleErrorOauth}
                        />
                    </GoogleOAuthProvider>
                </div>
                <form className="email-login" method='post'>
                    <div className="u-form-group">
                        <input name='email' value={email} onChange={e => handleChange(e, setForm, form)} type="email" placeholder="Email"/>
                    </div>
                    <div className="u-form-group">
                        <input name='password' value={password} onChange={e => handleChange(e, setForm, form)} type="password" placeholder="Mật khẩu"/>
                    </div>
                    <div className="u-form-group">
                        <button onClick={(e) => {
                            e.preventDefault();
                            handleSubmitLogin(form, "default")}
                        }>
                            {loading?<Spinner animation="border" variant="primary" />:"Đăng nhập"}
                        </button>
                    </div>
                    <div className="u-form-group">
                        <a href="#" onClick={() => navigate('/authentication/reset_password')} className="forgot-password">Quên mật khẩu ?</a>
                    </div>
                </form>
                <form className="email-signup" method='post'>
                    <div className="u-form-group">
                        <input type="email" value={emailRegister} name='emailRegister' onChange={e => handleChange(e, setFormRegister, formRegister)} placeholder="Email"/>
                    </div>
                    <div className="u-form-group">
                        <input  type="password" value={passwordRegister} name='passwordRegister' onChange={e => handleChange(e, setFormRegister, formRegister)} placeholder="Mật khẩu"/>
                    </div>
                    <div className="u-form-group">
                        <input type="password" value={confirmPassword} onChange={handleConfirmPassword} placeholder="Confirm Mật khẩu"/>
                    </div>
                    <div className="u-form-group">
                        <button onClick={handleSubmitRegister}>{loading?<Spinner/>:"Đăng ký"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}