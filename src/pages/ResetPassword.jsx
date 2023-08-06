import { useState } from 'react';
import '../scss/forgotpassword.css';
import { send_code } from '../api/store';
import generateRandomCode from '../extra/generate_random_code';
import Cookies from 'universal-cookie';
import { Spinner } from 'react-bootstrap';
const cookies = new Cookies();


export const ResetPassword = () => {
    // useState for email value
    const [email, setEmail] = useState("");
    const [value, setValue] = useState(null);
    // State for Spinner loading
    const [loading, setLoading] = useState(false);

    const handleSendEmail = async(e) => {
        e.preventDefault();
        if(email===""){
            alert("Bạn phải điền email vào");
            return;
        }
        const code = generateRandomCode(20);
        cookies.set('code', code);
        setLoading(true);
        const result = await send_code({email, code});
        setLoading(false);
        setValue(result.result);
    }

    return (
        <div class='empty_layout'>
            <div class="card login-form">
                <div class="card-body">
                    <h3 class="card-title text-center fw-bolder fs-2">Gửi mail để đặt lại mật khẩu</h3>
                    
                    <div class="card-text">
                        {value===null||value? (
                            <form>
                                <div class="form-group" style={{display:'flex', justifyContent: 'center', alignItems:'center'}}>

                                    <input type="email" class="form-control form-control-sm" name='email' value={email} onChange={(e => setEmail(e.target.value))} placeholder="Điền địa chỉ email của bạn"/>
                                </div>

                                <button type="submit" class="btn btn-primary btn-block" onClick={handleSendEmail}>{loading?<Spinner/>:"Đặt lại mật khẩu"}</button>
                            </form>

                        ): (
                            <div className='form-group'>
                                <div class="container">
                                <h1>Kiểm tra email của bạn</h1>
                                <p>Vui lòng click nút ở bên dưới để nhận mail và đặt lại mật khẩu</p>
                                <form action="#" method="post">
                                <button type="button" class='btn btn-primary btn-block'><a href="https://mail.google.com/mail">Kiem tra Email</a></button>
                                </form>
                            </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}