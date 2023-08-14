import { userAtom } from "../../atoms/authAtoms"
import {useAtom} from 'jotai'
import Input from "../../components/Posts/input";


const Home = () => {
  const [user] = useAtom(userAtom);
  return (
    <div>
      <p>ceci est la page home </p>
      {user ? (
        <>
          <h1>Hello {user.username}</h1>
          <Input />
        </>
      ) : (
        <p>Welcome on My Social Network. This website is a training to React, global state handling and tokens. Here, authentification and routing will be used to create a small social media website.</p>
      )}
    </div>
  )
}

export default Home
