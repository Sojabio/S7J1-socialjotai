import { useEffect, useState } from "react"
import { userAtom } from "../../atoms/authAtoms"
import { isAuthenticatedAtom } from "../../atoms/authAtoms"
import { useAtom } from 'jotai'
import Cookies from 'js-cookie'

const Profile = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  // const [description, setDescription] = useState('')
  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const jwtToken = Cookies.get('token');
  const userId = Cookies.get('userId');


  const handleSubmit = (e) => {
    e.preventDefault();

    const newDatas = {
      username: username,
      email: email
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/users/${userId}`, {
        method: 'put',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDatas)
      });
      if (response.ok) {
        const jsonData = await response.json();
        Cookies.set('token', jwtToken);
        setUser({
          username: jsonData.username,
          email: jsonData.email,
          token: jwtToken
        });
        console.log("votre profil a bien été mis à jour")
      } else {
        throw new Error('Erreur lors de la requête');
      }
    } catch (error) {
      console.error('Erreur de requête : ', error)
    }
  };
  fetchData()
};



  return (
    <div className="container mt-5">
      <>
      { user && isAuthenticated && (
        <>
        <p>Ceci est le profil de {user.username}</p>
        <p>mail: {user.email}</p>
        </>
      )}
      </>
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
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* <div className="mb-3">
        <textarea
          type="text"
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} />
        </div> */}
        <button type="submit" className="btn btn-primary">
          Enregistrer
        </button>
      </form>
    </div>
  )

}

export default Profile
