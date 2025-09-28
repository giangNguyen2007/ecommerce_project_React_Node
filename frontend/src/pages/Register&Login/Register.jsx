import './Register.css'
import {React, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useAuth from '../../customHooks/useAuth';

const Register = () => {
   
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {authenticate, error, isLoading} = useAuth();
    const navigate = useNavigate();

    
    const handleSubmit = async (e)  => { 
      e.preventDefault();

      await authenticate({username, email, password}, 'register');

      if (!error) {
        navigate('/home');
      }

    }

  return (
     <div className="login-register-container">

      <form onSubmit={handleSubmit}>
        <div className='section-title'>Register</div>

        <div className='input-container'>

              <div className='input-item'>
                  <label>Username:</label>
                  <input 
                    type="userName" 
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username} 
                  />
              </div>
              
              <div className='input-item'>
                  <label>Email :</label>
                  <input 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                  />
              </div>

              <div className='input-item'>
                  <label>Password:</label>
                  <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                  />
              </div>

            </div>

        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>

     </div>
  )
}

export default Register