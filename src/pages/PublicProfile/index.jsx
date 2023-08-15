import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../../atoms/authAtoms';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

const PublicProfile = () => {
  const { userId } = useParams();
  const [userInfo] = useAtom(authAtom);
  const [publicProfileInfo, setPublicProfileInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/users/${userId}?populate=*`, {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const jsonData = await response.json();
          setPublicProfileInfo(jsonData);
        } else {
          throw new Error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error('Erreur de requête : ', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {userInfo.isLoggedIn && (
        <div>ceci est le profil public de {publicProfileInfo.username}</div>
      )}
      <div>{publicProfileInfo.username} a publié {publicProfileInfo.posts?.length || 0} messages</div>
      {publicProfileInfo.posts?.map((post, index) => (
        <Card key={index} style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{post.text}</Card.Title>
            <Card.Text>nombre de likes : {post.like}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default PublicProfile;
