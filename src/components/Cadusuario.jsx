import { useEffect, useState } from 'react';

const Cadastro = ({escolheTela}) => {
  const [nome, setNome] = useState("");
  const [email, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [tentaConn, setTentaConn] = useState(0);
  const [blockBtn, setBlockBtn] = useState(false);
  function cadastrar(){
    if (tentaConn > 0){
      setBlockBtn(true);
            event.preventDefault();
            let dados = {
                nome,
                email,
                senha
            }
            fetch("https://js-lista-de-tarefas-api.onrender.com/usuarios", {
                method: "post",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(dados)
            })
            .then(resposta => resposta.json())
            .then(json => {
                if(json.tipo == "error"){
                    alert(json.mensagem);
                    return;
                }
                alert(json.mensagem);
                //escolheTela("");
                window.location.href = "index.html";
            })
            .catch(error => {
                alert(error.message);
            })

            console.log(dados);
            
        }
    setBlockBtn(false);
      }
  useEffect(() => {
    cadastrar();
  },[tentaConn])
  
  return (
    <>
      <div className="bg-slate-200 h-screen flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-4">
        <a href="/index.html" className="mb-5">Voltar</a>
        <h1 className="font-bold text-xl mb-6">Cadastre-se</h1>
        <form onSubmit={event => setTentaConn(tentaConn + 1)} className="flex flex-col w-80">
             <label className="uppercase text-xs font-bold mb-2 block">Nome</label>
            <input value={nome} onChange={event => setNome(event.target.value)} id="nome" type="text" placeholder="Digite seu nome" className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required />
            <label className="uppercase text-xs font-bold mb-2 block">Email</label>
            <input value={email} onChange={event => setLogin(event.target.value)} id="email" type="email" placeholder="email@email.com" className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required />
            <label className="uppercase text-xs font-bold mb-2 block">Senha</label>
            <input value={senha} onChange={event => setSenha(event.target.value)} id="senha" type="password" placeholder="********" className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required />
            <button disabled={blockBtn} className="w-full h-10 rounded bg-purple-400 hover:bg-purple-600 duration-200 hover:text-white font-bold">Cadastrar</button>
        </form>
    </div>
      </div>
    </>
  )
}

export default Cadastro;