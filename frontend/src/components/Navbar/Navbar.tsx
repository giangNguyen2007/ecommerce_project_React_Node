import React, { useContext, useState } from 'react'
import './Navbar.css';
import {Link, useNavigate} from 'react-router-dom';
import { SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import { AuthContext } from '../../context/AuthContext';
import { Badge } from '@material-ui/core';
import { CartContext } from '../../context/CartContext';
// import { AuthContext } from '../context/AuthContext';

type Props = {}

const Navbar = (props: Props) => {

    const {cartQuantity, dispatchCart} = useContext(CartContext);
    const {user, dispatchAuth} = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('')

    const navigate = useNavigate();

    const handleLogout = (e : React.MouseEvent<HTMLDivElement, MouseEvent>) => { 
        // remove user from storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatchAuth({ type: 'LOG_OUT', payload: null }) ;
        dispatchCart({type: 'RESET_NULL'});

        navigate('/');
     }

  return (
        <div className='navbar'>
            <div className="navbar-wrapper">
                <div className="navbar-left">
                    <div className="language">
                        ENG
                    </div>
                    <div className="search-container">
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                        
                        <Link to={`/product/search/${searchQuery}`}
                            onClick={(e) => setSearchQuery("")}
                        >
                            <SearchOutlined/>
                        </Link>
                    </div>
                </div>

                <div className="navbar-center">
                    <h3 className='title'> FOOT.SHOPEE.</h3>
                </div>

                <div className="navbar-right">
                    <div className='user-email'> 
                        {user? user.email : null}
                    </div>

                    <Link to={`/`}>
                        <div className='menu-item'>Home</div>
                    </Link>

                    <div className='dropdown'>
                        <div className='menu-item'>Category</div>

                        <div className="content">
                            <Link to={`/list/Shoes`}>
                                <div className='dropdown-item'>Shoes</div>
                            </Link>
                            <Link to={`/list/Balls`}>
                                <div className='dropdown-item'>Balls</div>
                            </Link>
                            <Link to={`/list/Shirts`}>
                                <div className='dropdown-item'>Shirts</div>
                            </Link>
                        </div>
                    </div>

                    <div className='dropdown'>
                            { user?
                                <div className='menu-item' onClick={handleLogout}>
                                    Logout
                                </div>
                                :
                                <Link to={`/login`}>
                                    <div className='menu-item'>Login</div>
                                </Link>
                            }

                        <div className="content">
                            {!user && <Link to={`/register`}>
                                <div className='dropdown-item'>Register</div>
                            </Link>}
                        </div>
                    </div>




                    { user && <Link to={`/cart`}>
                        <Badge badgeContent={cartQuantity} color='primary' overlap="rectangular">
                            <div className='menu-item'> <ShoppingCartOutlined/> </div>
                        </Badge>
                    </Link>}
                    
                </div>

            </div>
        </div>
  )
}

export default Navbar