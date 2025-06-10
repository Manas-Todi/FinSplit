import React from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const SideMenu = ({activeMenu}) => {
  const {user, clearUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === 'logout') {
      handleLogout();
      return;
    }
    navigate(route); 
  };

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem('token');
    navigate('/login');
  }

  return ;
};

export default SideMenu