import { useEffect, useState } from 'react';
import '../scss/changePassword.css';
import { useNavigate, useParams } from 'react-router-dom';
import { reset_password } from '../api/store';
import Cookies from 'universal-cookie';
import { Spinner } from 'react-bootstrap';
const cookies = new Cookies();

export const ChangePassword = () => {
  const {email, code} = useParams();
  const navigate = useNavigate();
  // State for Spinner loading
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    email,
    old_password: "",
    new_password: ""
  });

  useEffect(() =>{
    if(cookies.get('code')!==code){
      navigate('/notfound');
    }

    return () => {};
  }, [])


  const {old_password, new_password} = formValue;

  const handleChange = (e) => {
    setFormValue({...formValue, [e.target.name]: [e.target.value]})
  }

  const handleSubmit = async(e) => {
    if(old_password==="" || new_password===""){
      alert("Bạn không được để trống các field");
      return;
    }
    e.preventDefault();
    setLoading(true);
    const {data} = await reset_password(formValue);
    setLoading(false);
    alert(data.result.message)
    console.log(data);
  }

  return (
      <div class='empty_layout'>
          <div class="container">
          <h1 className='fs-1 fw-bolder text-primary'>Thay đổi mật khẩu</h1>
          <form>
            <div class="form-group">
              <label for="oldPassword" className='text-primary'>Old Password</label>
              <input type="password" name='old_password' value={old_password} onChange={handleChange} id="oldPassword" required/>
            </div>
            <div class="form-group">
              <label for="newPassword" className='text-primary'>New Password</label>
              <input type="password" name='new_password' value={new_password} onChange={handleChange} id="newPassword" required/>
            </div>
            <button type="submit" className='btn btn-primary' onClick={handleSubmit}>{loading?<Spinner/>:"Thay đổi"}</button>
          </form>
        </div>
          
      </div>
  )
}