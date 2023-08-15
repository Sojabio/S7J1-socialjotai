import { useState } from "react";
import { useAtom } from 'jotai';
import { authAtom } from "../../atoms/authAtoms";
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

function Register() {
  const [userInfo, setUserInfo] = useAtom(authAtom);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        const responseData = await response.json();
        const jwtToken = responseData.jwt;
        const userId = responseData.user.id;
        Cookies.set('token', jwtToken);
        Cookies.set('userId', userId);
        console.log('Inscription réussie');
        console.log(userId);
        console.log(jwtToken)
        console.log(responseData)
        setUserInfo({
          isLoggedIn: true,
          userId: responseData.user.id,
          username: responseData.user.username,
          token: jwtToken
        });
        navigate('/')
      } else {
        throw new Error('Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Inscription Rapide</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Mail:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
