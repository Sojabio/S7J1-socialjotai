import {useAtom} from 'jotai'
import { isAuthenticatedAtom } from "../../atoms/authAtoms";
import { userAtom } from "../../atoms/authAtoms";
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom)
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false);
    navigate('/')
    console.log("déconnexion réussie")
  };

  return (
    <div>
      {isAuthenticated && (
        <button onClick={handleLogout} className='btn btn-secondary'>
          Disconnect
        </button>
      )}
    </div>
  );
}


export default LogoutButton;
