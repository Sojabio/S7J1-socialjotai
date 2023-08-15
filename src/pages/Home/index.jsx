import {useAtom} from 'jotai'
import { authAtom } from '../../atoms/authAtoms';
import Input from "../../components/Posts/input";


const Home = () => {
  const [userInfo] = useAtom(authAtom);
  return (
    <div>
      <p>ceci est la page home </p>
      {userInfo.isLoggedIn ? (
        <>
          <h1>Hello {userInfo.username}</h1>
          <Input />
        </>
      ) : (
        <p>Welcome on My Social Network. This website is a training to React, global state handling and tokens. Here, authentification and routing will be used to create a small social media website.</p>
      )}
    </div>
  )
}

export default Home
