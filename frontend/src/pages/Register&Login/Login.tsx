import './Register.css'
import { useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import useAuth from '../../customHooks/useAuth';

const Login = () => {
   
    const [username, setUsername] = useState('giang-nguyen4')
    const [email, setEmail] = useState('akatsuki@gmail.com')
    const [password, setPassword] = useState('12345')
    const {authenticate, error, isLoading} = useAuth();
    // const {loadUserCart} = useChangeCart();
    const navigate = useNavigate();

    
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>)  => { 
      e.preventDefault();

      try {
        const response = await authenticate({username, email, password}, 'login');
      
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
                    value={"giang-nguyen4"} 
                  />
              </div>
              
              <div className='input-item'>
                  <label>Email :</label>
                  <input 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={"akatsuki@gmail.com"} 
                  />
              </div>

              <div className='input-item'>
                  <label>Password:</label>
                  <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={"12345"} 
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