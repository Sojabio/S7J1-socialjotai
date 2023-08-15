import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { authAtom } from "../../atoms/authAtoms";
import { Link } from 'react-router-dom';

const List = ({submitCount, setSubmitCount}) => {
  const [posts, setPosts] = useState([])
  const [userInfo] = useAtom(authAtom);
  const jwtToken = userInfo.token;
  const userId = userInfo.userId;


  // RECUPERER LES DONNEES POUR LA LISTE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/posts/?populate=*', {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const jsonData = await response.json();
          const reversedData = jsonData.data.reverse();
          setPosts(reversedData);
        } else {
          throw new Error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error('Erreur de requête : ', error)
      }
    };
    fetchData()
  }, [submitCount]);


  // GERER LES SUPPRESSIONS
  const handleDelete = (postId) => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/posts/${postId}`, {
          method: 'delete',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          // const jsonData = await response.json();
          console.log("post supprimé")
          setSubmitCount(submitCount + 1);
        } else {
          throw new Error('Erreur lors de la requête')
        }
      } catch (error) {
        console.error('Erreur de requête: ', error)
      }
    };
    fetchData();
  }


  // DISPLAY LA CARD
  return (
    <div className="container mt-5">
      <h3>Voici la liste des posts</h3>
      <>
        {posts.map((post, index) => {
          return (
            <Card key={index} style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>
                {post.attributes.text}
                </Card.Title>
                <Card.Text>
                  <div>
                    <Link to={`/${post.attributes.user.data.id}`}>Posté par : {post.attributes.user.data.attributes.username}</Link>
                    <p> Posté par l'utilisateur numéro {post.attributes.user.data.id}</p>
                    <p> Nombre de likes : {post.attributes.like} </p>
                  </div>
                </Card.Text>
              </Card.Body>
              {post.attributes.user.data.attributes.username === userInfo.username ? (
                <button onClick={() => handleDelete(post.id)}> supprimer </button>
              ) : (
                ""
              )}
            </Card>
          )
        })}
      </>
    </div>
  )
}

export default List
