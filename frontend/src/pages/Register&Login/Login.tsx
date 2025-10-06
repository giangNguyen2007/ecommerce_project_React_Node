import './Register.css'
import { useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import useAuth from '../../customHooks/useAuth';

const Login = () => {
   
    const [username, setUsername] = useState('guest')
    const [email, setEmail] = useState('guest@gmail.com')
    const [password, setPassword] = useState('12345')
    const {authenticate, error, isLoading} = useAuth();
    // const {loadUserCart} = useChangeCart();
    const navigate = useNavigate();

    
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>)  => { 
      e.preventDefault();

      try {
        const response = await authenticate({username, email, password}, 'login');

        if (response) {
          // loadUserCart();
          navigate('/');
        }
      
      } catch (e){
        console.log(e)
      }
 
    }
    

  return (
     <div className="login-register-container">
        <form onSubmit={ handleSubmit}>
            <div className='section-title'>Login</div>

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

            <button >Login</button>
            {/* {error && <div className="error">{error}</div>} */}

      </form>

     </div>
  )
}

export default Login