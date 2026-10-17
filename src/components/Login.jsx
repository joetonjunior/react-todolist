import { useEffect, useState } from 'react';

const Login = ({escolheTela}) => {
  const [email, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [tentaConn, setTentaConn] = useState(0);
  const [blockBtn, setBlockBtn] = useState(false);
  function logar(){
    if (tentaConn > 0) {
      event.preventDefault();
      setBlockBtn(true);

            let dados = {
                email,
                senha
            };
            fetch("https://js-lista-de-tarefas-api.onrender.com/login", {
                method: "post",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(dados)
            })
            .then(resposta => resposta.json())
            .then(json => {
                if(json.tipo == "warning"){
                    alert(json.mensagem);
                    setBlockBtn(false);
                    return;
                }

                sessionStorage.setItem("usuario", JSON.stringify(json.usuario));

                alert(json.mensagem);
                escolheTela("principal");
                //window.location.href = "tarefas.html";
            })
            .catch(error => {
                alert(error.message);
            })

            console.log(sessionStorage.getItem("usuario"));
            
    }
    setBlockBtn(false);
        }
  useEffect(() => {
    logar();
  },[tentaConn])
  
  return (
    <>
      <div className="bg-slate-200 h-screen flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-4">
        <h1 className="font-bold text-xl mb-6">Seja bem-vindo(a)</h1>
        <form onSubmit={event => setTentaConn(tentaConn + 1)} className="flex flex-col w-80">
            <label className="uppercase text-xs font-bold mb-2 block">Email</label>
            <input value={email} onChange={event => setLogin(event.target.value)} id="email" type="email" placeholder="email@email.com" className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required />
            <label className="uppercase text-xs font-bold mb-2 block">Senha</label>
            <input value={senha} onChange={event => setSenha(event.target.value)} id="senha" type="password" placeholder="********" className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required />
            <a onClick={event => escolheTela("cadastro")} className="cursor-pointer w-35 my-5">Cadastre-se</a>
            <button disabled={blockBtn} className="w-full h-10 rounded bg-purple-400 hover:bg-purple-600 duration-200 hover:text-white font-bold">Logar</button>
        </form>
    </div>
      </div>
    </>
  )
}

export default Login
