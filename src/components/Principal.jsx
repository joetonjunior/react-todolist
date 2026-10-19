import { useEffect, useState } from 'react';
import { BiPencil } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { BiX  } from "react-icons/bi";

const Cards = ({escolheTela}) => {
  const [tentaConn, setTentaConn] = useState(1);
  const [blockBtn, setBlockBtn] = useState(false);
  
  const [pesquisarTarefaCtrl, setPesquisarTarefaCtrl] = useState("");
  const [tituloCriacao, setTituloCriacao] = useState("");
  const [descricaoCriacao, setDescricaoCriacao] = useState("");

  const [tituloEdicao, setTituloEdicao] = useState("");
  const [descricaoEdicao, setDescricaoEdicao] = useState("");
  
  const [idEdicao, setIdEdicao] = useState(-1);
  const [idDelecao, setIdDelecao] = useState(-1);
  
  const [abrirFormCriarCtrl, setAbrirFormCriarCtrl] = useState(false);
  const [abrirFormEditarCtrl, setAbrirFormEditarCtrl] = useState(false);
  
  const [buscarTarefasCtrl, setBuscarTarefasCtrl] = useState(0);
  const [carregarTarefasCtrl, setCarregarTarefasCtrl] = useState(0);
  const [criarTarefaCtrl, setCriarTarefaCtrl] = useState(0);
  const [editarTarefaCtrl, setEditarTarefaCtrl] = useState(0);
  const [salvarAlteracoesCtrl, setSalvarAlteracoesCtrl] = useState(0);

  const [dadosOriginais, setDadosOriginais] = useState([]);
  const [dados, setDados] = useState([]);  
  let tarefas = [];
  function listaCards(){
    if (tentaConn > 0) {
      console.log("chegou na listaCards");
      setBuscarTarefasCtrl(buscarTarefasCtrl + 1);
  };
    setTentaConn(0);}

  function buscarTarefas(){
    if (buscarTarefasCtrl > 0){
      console.log("chegou na buscarTarefas");
    try {
        let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;

        if(!usuario){
            window.location.href = "index.html";
        }
        fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${usuario.id}`)
        .then(resposta => resposta.json())
        .then(json => {
            if(json.tipo == "error"){
                throw json.mensagem;
            }
            tarefas = json;
            console.log(tarefas);
            setDados(tarefas);
            setDadosOriginais(tarefas);
        })
    } catch (error) {
        
    }
}
    setBuscarTarefasCtrl(0)}

  function criarTarefa(){
    if(criarTarefaCtrl > 0){
      event.preventDefault();
    try {
        let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
        let obj = {
            titulo: tituloCriacao,
            descricao: descricaoCriacao,
            usuario_id: usuario.id
        }

        fetch("https://js-lista-de-tarefas-api.onrender.com/tarefas",{
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(resposta => resposta.json())
        .then(json => {
            alert(json.mensagem);
            setAbrirFormCriarCtrl(false);
            setBuscarTarefasCtrl(buscarTarefasCtrl + 1)
        })
        
    } catch (error) {
        alert("Error: ", error.message);
    }
    }
    setCriarTarefaCtrl(0);
}

  function abrirFormEditar(){
    if (editarTarefaCtrl > 0){
    let tarefaFiltrada = dados.filter(tarefa => tarefa.id == idEdicao);
    setTituloEdicao(tarefaFiltrada.titulo);
    setDescricaoEdicao(tarefaFiltrada.descricao)
    // // let overlay = document.querySelector("#overlay");213
    // // let formeditar = document.querySelector("#form-editar");
    // // let idEdicao = document.querySelector("#idEdicao");
    // let tituloEdicao = document.querySelector("#tituloEdicao");
    // let descricaoEdicao = document.querySelector("#descricaoEdicao");
    // let tarefa = tarefas.find(tarefa => tarefa.id == id);
    // overlay.classList.remove("opacity-0", "invisible");
    // formeditar.classList.remove("opacity-0", "invisible");
    // idEdicao.value = tarefa.id;
    // tituloEdicao.value = tarefa.titulo;
    // descricaoEdicao.value = tarefa.descricao;  
    }
    setEditarTarefaCtrl(0);
    
  }

  function editarTarefa(){
    if (salvarAlteracoesCtrl > 0){
      event.preventDefault();
    try {
        console.log(idEdicao);
        let tarefaFiltrada = dados.filter(tarefa => tarefa.id == idEdicao);
        let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
        let titulo = tituloEdicao;
        let descricao = descricaoEdicao;
        let id = tarefaFiltrada.id;
        let obj = {
            titulo: titulo.value,
            descricao: descricao.value,
            usuario_id: usuario.id
        }

        fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${id.value}`,{
            method: "put",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(resposta => resposta.json())
        .then(json => {
            alert(json.mensagem);
          setSalvarAlteracoesCtrl(0)
          setEditarTarefaCtrl(0);
          setBuscarTarefasCtrl(1)
            // fecharFormEditar();
            // buscarTarefas();
        })
        
    } catch (error) {
        alert("Error: ", error.message);
    }

    }
    
    setSalvarAlteracoesCtrl(0)
    setIdEdicao(-1);
    setBuscarTarefasCtrl(0)
}



  useEffect(() => {
    listaCards();
  },[tentaConn]);


  useEffect(() => {
    if(buscarTarefasCtrl > 0){
       buscarTarefas();
      setBuscarTarefasCtrl(0);
    }
  },[buscarTarefasCtrl]);


  useEffect(() => {
    if(criarTarefaCtrl > 0){
       criarTarefa();
      setCriarTarefaCtrl(0);
    }
  },[criarTarefaCtrl]);
  

  useEffect(() => {
    if(editarTarefaCtrl > 0){
       abrirFormEditar();
      setEditarTarefaCtrl(0);
    }
  },[editarTarefaCtrl]);

    useEffect(() => {
    if(idEdicao > - 1){
       setEditarTarefaCtrl(1);
    }
  },[idEdicao]);

  useEffect(() => {
    if(salvarAlteracoesCtrl > 0){
       setSalvarAlteracoesCtrl(0);
    }
  },[salvarAlteracoesCtrl]);
  

  return (
    <>
   <header className="flex justify-between items-center py-4 px-15 bg-purple-500">
    <input onKeyUp={event => setPesquisarTarefaCtrl(event.target.value)} className="h-10 w-100 pl-4 rounded bg-white" type="text" placeholder="Pesquisar" />
    <button onClick={event => setAbrirFormCriarCtrl(true)} className="cursor-pointer leading-10 bg-purple-800 rounded px-4 font-bold text-white duration-200 hover:bg-purple-400 hover:text-black">Nova Tarefa</button>
  </header>
<main className="p-15 bg-slate-200">
    <h1 onClick={event => setTentaConn(tentaConn + 1)} className="text-3xl font-bold mb-6">Tarefas</h1>
    <div className="grid grid-cols-4 gap-4">
        {dados.length == 0 ? (
            <div>Crie sua primeira tarefa!</div>
        ) : (
            dados.map((tarefa) => (
                <div key={tarefa.id} className="bg-white p-4 rounded-lg">
                    <h3 className="font-bold mb-4">{tarefa.titulo}</h3>
                    <p>{tarefa.descricao}</p>
                    <div className="flex justify-end gap-3">
                        <BiPencil value={tarefa.id} onClick={() => setIdEdicao(tarefa.id)} className="cursor-pointer hover:fill-purple-500" />
                        <BiTrash className="cursor-pointer hover:fill-purple-500" />
                    </div>
                </div>
            ))
        )}
    </div>
    <div id="overlay" onClick={event => setAbrirFormCriarCtrl(false)} className={(!abrirFormCriarCtrl) ? "opacity-0 invisible" : "w-full h-screen bg-black/70 fixed top-0 left-0 duration-200"}></div>
    <div id="form-criar" className={!abrirFormCriarCtrl ? "opacity-0 invisible" : "w-100 p-4 rounded-lg bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-200 delay-200"}>
        <div className="flex justify-end">
            <BiX onClick={event => setAbrirFormCriarCtrl(false)} name='x' className="cursor-pointer" />
        </div>
        <form className="flex flex-col">
            <label className="uppercase text-xs font-bold mb-2 block">Título</label>
            <input value={tituloCriacao} onChange={event => setTituloCriacao(event.target.value)} id="titulo" type="text" placeholder="Titulo da tarefa" className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required />
            <label className="uppercase text-xs font-bold mb-2 block">Descrição</label>
            <textarea  value={descricaoCriacao} onChange={event => setDescricaoCriacao(event.target.value)} id="descricao" placeholder="Descrição" className="pl-3 h-30 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required></textarea>
            <button onClick={event => setCriarTarefaCtrl(criarTarefaCtrl + 1)} id="btnsave" type="submit" className="w-full h-10 rounded bg-purple-400 hover:bg-purple-600 duration-200 hover:text-white font-bold">Cadastrar</button>
        </form>
    </div>
    <div id="form-editar" className={!abrirFormEditarCtrl ? "opacity-0 invisible" : "w-100 p-4 rounded-lg bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 invisible duration-200 delay-200"}>
        <div className="flex justify-end">
            <BiX onClick={event => setIdEdicao(-1), event => setAbrirFormEditarCtrl(false)} name='x' className="cursor-pointer" />
        </div>
        <form className="flex flex-col">
            <input type="hidden" id="campoEscondido" />
            <label className="uppercase text-xs font-bold mb-2 block">Título</label>
            <input value={tituloEdicao} onChange={event => setTituloEdicao(event.target.value)} id="tituloEdicao" type="text" placeholder="Titulo da tarefa" className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required />
            <label className="uppercase text-xs font-bold mb-2 block">Descrição</label>
            <textarea value={descricaoEdicao} onChange={event => setDescricaoEdicao(event.target.value)}  id="descricaoEdicao" placeholder="Descrição" className="pl-3 h-30 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required></textarea>
            <button onClick={event => setEditarTarefaCtrl(editarTarefaCtrl + 1)} id="btnsaveEdicao" type="submit" className="w-full h-10 rounded bg-purple-400 hover:bg-purple-600 duration-200 hover:text-white font-bold">Salvar</button>
        </form>
    </div>
</main>
    </>
)};
export default Cards;