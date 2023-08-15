import {useAtom} from 'jotai'
// import { isAuthenticatedAtom } from "../../atoms/authAtoms";
// import { userAtom } from "../../atoms/authAtoms";
import { authAtom } from '../../atoms/authAtoms';
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
  const [userInfo, setUserInfo] = useAtom(authAtom)
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserInfo({
      isLoggedIn: false,
      userId: null,
      username: '',
      token: null
    });
    navigate('/')
    console.log("déconnexion réussie")
  };

  return (
    <div>
      {userInfo.isLoggedIn && (
        <button onClick={handleLogout} className='btn btn-secondary'>
          Disconnect
        </button>
      )}
    </div>
  );
}


export default LogoutButton;
