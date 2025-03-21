import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import header from '../assets/header.png';
import body from '../assets/body.png';
import image from '../assets/loginimage.png';
import Loader from '../components/loader/Loader';
import footer from '../assets/footer.png';
import { IoIosLock } from "react-icons/io";
import { MdKeyboardArrowRight } from 'react-icons/md';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/user/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/account');
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || error.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-main">

      {
        loading ? <Loader /> : ''
      }
      <img src={header} alt="Header" className="login-header-img" />
    
      <div className="login-hero">
        <div className="login-form-area">
          <div className="login-box">
          <div className='login-image'>
                <img src={image} alt="body" className='login-body-img-form'/></div>
                
            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <div className="login-input-group">
                <input
                  type="text"
                  className="login-input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="User ID"
                  required
                />
                <input 
                  type="password"
                  className="login-input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  required
                />
                 <button className="login-sign-in-btn" type="submit" disabled={loading}>
                <IoIosLock /> Log In
              </button>

              <div className="login-links">
              <a href="#" className="login-link">
                Sign Up Now <MdKeyboardArrowRight size={20} />
              </a>
              <a href="#" className="login-link">
                Forgot Password <MdKeyboardArrowRight size={20} />
              </a>
            </div>
            </div>
            </form>

            {/* Additional Links */}
            {/* <div className="login-links">
              <a href="#" className="login-link">
                Corporate & Commercial banking login <MdKeyboardArrowRight size={20} />
              </a>
            </div> */}
          </div>
        </div>
      </div>
      <img src={body} alt="Footer" className="login-body-img" />
      <img src={footer} alt='footer'className='login-body-img' />
    </main>
  );
}

export default Login;