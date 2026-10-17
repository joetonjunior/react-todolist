import { useState } from 'react'
import Login from './components/Login'
import Cadastro from './components/Cadusuario'

function App() {
  const [tela, setTela] = useState("");
  const defineTela = (novaTela) => {
    setTela(novaTela);
  };
  return (
    <>
      {tela === "cadastro" ? (
        <Cadastro escolheTela={defineTela} />
      ): tela === "principal" ? (
        <p>Hello World!</p>
      ):(
        <Login escolheTela={defineTela}/>
      )}
    </>
  )
}

export default App
