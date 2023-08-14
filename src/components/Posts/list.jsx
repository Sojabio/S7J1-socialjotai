import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms/authAtoms';

const List = ({submitCount, setSubmitCount}) => {
  const [posts, setPosts] = useState([])
  const jwtToken = Cookies.get('token');
  const [user] = useAtom(userAtom);
  // const userId = Cookies.get('userId');


  // RECUPERER LES DONNEES POUR LA LISTE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/posts/?populate=user', {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const jsonData = await response.json();
          const reversedData = jsonData.data.reverse();
          setPosts(reversedData)
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
          const jsonData = await response.json();
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
      <p>Voici la liste des posts</p>
      <>
        {posts.map((post, index) => {
          return (
            <Card key={index} style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>
                <p>Posté par : {post.attributes.user.data.attributes.username} </p>
                </Card.Title>
                <Card.Text>
                {post.attributes.text}
                </Card.Text>
              </Card.Body>
              {post.attributes.user.data.attributes.username === user.username ? (
                <button onClick={() => handleDelete(post.id)}> supprimer </button>
              ) : (
                "Je suis lecteur"
              )}
            </Card>
          )
        })}
      </>
    </div>
  )
}

export default List
