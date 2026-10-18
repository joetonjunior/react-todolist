import { useState } from 'react'
import Login from './components/Login'
import Cadastro from './components/Cadusuario'
import Cards from './components/Principal'

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
        <Cards escolheTela={defineTela} />
      ):(
        <Login escolheTela={defineTela}/>
      )}
    </>
  )
}

export default App
