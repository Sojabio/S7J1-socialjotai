import { Link } from 'react-router-dom';
import LogoutButton from '../Auth/LogoutButton';
import { useAtom } from 'jotai';
import { authAtom } from '../../atoms/authAtoms';

const NavBar = () => {
  const [userInfo] = useAtom(authAtom);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        {userInfo.isLoggedIn ? (
          <>
            <Link className="navbar-brand" to="/Profile">
              Profil
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link className="navbar-brand" to="/Register">
              Register
            </Link>
            <Link className="navbar-brand" to="/Login">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
