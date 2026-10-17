import { useState } from 'react'
import Login from './components/Login'

function App() {
  const [tela, setTela] = useState("");
  const defineTela = (novaTela) => {
    setTela(novaTela);
  };
  // setUser(sessionStorage.getItem("usuario"))
  // console.log(user)
  // if (user != ""){
  //   console.log("funfou!!!")
  // }
  // useEffect(() => {
  //   App();
  // },[user])
  return (
    <>
      {tela ? (
      <p>hello world!</p>
      ):(
      <Login escolheTela={defineTela}/>
      )}
    </>
  )
}

export default App
