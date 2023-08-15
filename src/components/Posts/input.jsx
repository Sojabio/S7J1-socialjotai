import { useState } from "react"
import Cookies from "js-cookie";
import List from "./list";
import { useAtom } from 'jotai';
import { authAtom } from "../../atoms/authAtoms";

const Input = () => {
  const [postContent, setPostContent] = useState('');
  // const jwtToken = Cookies.get('token');
  // const userId = Cookies.get('userId');
  const [submitCount, setSubmitCount] = useState(0);
  const [userInfo] = useAtom(authAtom);
  const jwtToken = userInfo.token;
  const userId = userInfo.userId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const objectData = {
      "data": {
        "user": userId,
        "text": postContent,
      }
    }

    console.log(jwtToken)

    try {
      const response = await fetch('http://localhost:1337/api/posts', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(objectData)
      });
      if (response.ok) {
        console.log(`le post a été envoyé par ${userInfo.username}`)
        setSubmitCount(submitCount + 1);
      } else {
        throw new Error('Erreur lors de la connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la requête: ', error);
    }
  };


  return (
    <>
      <div><p>ceci est l'endroit où on met du texte</p></div>
      <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          className="form-control"
          id="post"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)} />
        <button type="submit" className="btn btn-primary">
          Poster
        </button>
      </form>
    </div>
    <List submitCount={submitCount} setSubmitCount={setSubmitCount}  />
  </>
  )
}

export default Input
