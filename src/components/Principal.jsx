import { useEffect, useState } from 'react';
import { BiPencil } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { BiX  } from "react-icons/bi";

// const iconMap = {
//   fecha: BiX,
//   deleta: BiTrash,
//   edita: BiPencil
// };

// const DynamicIcon = ({name, ...props}) => {
//   const IconComponent = iconMap[name];
//   if (!IconComponent){
//     return null;
//   }
//   return <IconComponent {...props} />;
// };

const Cards = ({escolheTela}) => {
  const [tentaConn, setTentaConn] = useState(1);
  const [blockBtn, setBlockBtn] = useState(false);
  
  const [pesquisarTarefaCtrl, setPesquisarTarefaCtrl] = useState("");
  const [abrirFormCriarCtrl, setAbrirFormCriarCtrl] = useState(0);
  const [fecharFormCriarCtrl, setFecharFormCriarCtrl] = useState(0);
  const [fecharFormEditarCtrl, setFecharFormEditarCtrl] = useState(0);
  
  const [buscarTarefasCtrl, setBuscarTarefasCtrl] = useState(0);
  const [carregarTarefasCtrl, setCarregarTarefasCtrl] = useState(0);
  const [criarTarefaCtrl, setCriarTarefaCtrl] = useState(0);
  const [editarTarefaCtrl, setEditarTarefaCtrl] = useState(0);

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
            //setCarregarTarefasCtrl(carregarTarefasCtrl + 1);
        })
    } catch (error) {
        
    }
}
    setBuscarTarefasCtrl(0)}

  function carregarTarefas(){
  if (carregarTarefasCtrl > 0){
    console.log("chegou na carregarTarefas");
    console.log(dados);
     let listaTarefas = [];
       listaTarefas = dados;
    let grid = document.querySelector("#tarefas");
    grid.innerHTML = ""
    if(!listaTarefas){//listaTarefas?.length == 0){
        grid.innerHTML = "<p>Crie sua primeira tarefa</p>";
    }else{
        listaTarefas.map(listaTarefas => {
        grid.innerHTML += `
         <div class="bg-white p-4 rounded-lg">
                <h3 class="font-bold mb-4">${listaTarefas.titulo}</h3>
                <p>${listaTarefas.descricao}</p>
                <div class="flex justify-end gap-3">
                    <DynamicIcon name="edita" size={10} />
                    <BiPencil class="cursor-pointer hover:fill-purple-500"/>
                    <BiTrash className="cursor-pointer hover:fill-purple-500"/>
                </div>
            </div>
        `;
        })
    }
    console.log(listaTarefas);
}
setCarregarTarefasCtrl(0);}



  useEffect(() => {
    listaCards();
  },[tentaConn]);

  useEffect(() => {
    if(carregarTarefasCtrl > 0){
      carregarTarefas();
      setCarregarTarefasCtrl(0)
    }
  },[carregarTarefasCtrl]);

  useEffect(() => {
    if(buscarTarefasCtrl > 0){
       buscarTarefas();
      setBuscarTarefasCtrl(0);
    }
  },[buscarTarefasCtrl]);
/*
  useEffect(() => {
    listaCards();
  },[fecharFormCriarCtrl]);

  useEffect(() => {
    fecharFormCriar();
  },[fecharFormEditarCtrl]);

  useEffect(() => {
    listaCards();
  },[criarTarefaCtrl]);
  
  useEffect(() => {
    listaCards();
  },[editarTarefaCtrl]);

  useEffect(() => {
    listaCards();
  },[buscarTarefasCtrl]);

  useEffect(() => {
    listaCards();
  },[carregarTarefasCtrl]);
  */
  return (
    <>
    <header className="flex justify-between items-center py-4 px-15 bg-purple-500">
        <input onKeyUp={event => setPesquisarTarefaCtrl(event.target.value)} className="h-10 w-100 pl-4 rounded bg-white" type="text" placeholder="Pesquisar"/>
        <button onClick={event => setAbrirFormCriarCtrl(abrirFormCriarCtrl + 1)} className="cursor-pointer leading-10 bg-purple-800 rounded px-4 font-bold text-white duration-200 hover:bg-purple-400 hover:text-black">Nova Tarefa</button>
    </header>
      {dados.length == 0 ?(
      <main className="p-15 bg-slate-200">
        <h1 onClick={event => setTentaConn(tentaConn + 1)} className="text-3xl font-bold mb-6">Tarefas</h1>
        <div>Crie sua primeira tarefa!</div>
        <div onClick={event => setFecharFormCriarCtrl(fecharFormCriarCtrl + 1), event => setFecharFormEditarCtrl(fecharFormEditarCtrl + 1)} id="overlay" className="w-full h-screen bg-black/70 fixed top-0 left-0 opacity-0 invisible duration-200"></div>
        <div id="form-criar" className="w-100 p-4 rounded-lg bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 invisible duration-200 delay-200">
            <div className="flex justify-end">
                <BiX onClick={event => setFecharFormCriarCtrl(fecharFormCriarCtrl + 1)} name='x' className="cursor-pointer"/>
            </div>
            <form className="flex flex-col">
                <label className="uppercase text-xs font-bold mb-2 block">Título</label>
                <input id="titulo" type="text" placeholder="Titulo da tarefa" className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required />
                <label className="uppercase text-xs font-bold mb-2 block">Descrição</label>
                <textarea id="descricao" placeholder="Descrição" className="pl-3 h-30 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required></textarea> 
                <button onClick={event => setCriarTarefaCtrl(criarTarefaCtrl + 1)} id="btnsave" type="submit" className="w-full h-10 rounded bg-purple-400 hover:bg-purple-600 duration-200 hover:text-white font-bold">Cadastrar</button>
            </form>
        </div>
        <div id="form-editar" className="w-100 p-4 rounded-lg bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 invisible duration-200 delay-200">
            <div className="flex justify-end">
                <BiX onClick={event => setFecharFormEditarCtrl(fecharFormEditarCtrl + 1)} name='x' className="cursor-pointer"/>
            </div>
            <form onSubmit={event => setEditarTarefaCtrl(editarTarefaCtrl + 1)} className="flex flex-col">
                <input type="hidden" id="idEdicao"/>
                <label className="uppercase text-xs font-bold mb-2 block">Título</label>
                <input id="tituloEdicao" type="text" placeholder="Titulo da tarefa" className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required />
                <label className="uppercase text-xs font-bold mb-2 block">Descrição</label>
                
                <textarea id="descricaoEdicao" placeholder="Descrição" className="pl-3 h-30 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required></textarea> 
                <button onClick={event => setEditarTarefaCtrl(editarTarefaCtrl + 1)} id="btnsaveEdicao" type="submit" className="w-full h-10 rounded bg-purple-400 hover:bg-purple-600 duration-200 hover:text-white font-bold">Salvar</button>
            </form>
        </div>
    </main>
      ):(
        <main className="p-15 bg-slate-200">
        <h1 onClick={event => setTentaConn(tentaConn + 1)} className="text-3xl font-bold mb-6">Tarefas</h1>
        <div className="grid grid-cols-4 gap-4">
          {dados.map((tarefa) => (
            
               <div key={tarefa.id} className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold mb-4">${tarefa.titulo}</h3>
                  <p>${tarefa.descricao}</p>
                  <div className="flex justify-end gap-3">
                      <BiPencil className="cursor-pointer hover:fill-purple-500" />
                      <BiTrash className="cursor-pointer hover:fill-purple-500" />
                  </div>
                </div>
            
          ))}
          </div>
        <div onClick={event => setFecharFormCriarCtrl(fecharFormCriarCtrl + 1), event => setFecharFormEditarCtrl(fecharFormEditarCtrl + 1)} id="overlay" className="w-full h-screen bg-black/70 fixed top-0 left-0 opacity-0 invisible duration-200"></div>
        <div id="form-criar" className="w-100 p-4 rounded-lg bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 invisible duration-200 delay-200">
            <div className="flex justify-end">
                <BiX onClick={event => setFecharFormCriarCtrl(fecharFormCriarCtrl + 1)} name='x' className="cursor-pointer"/>
            </div>
            <form className="flex flex-col">
                <label className="uppercase text-xs font-bold mb-2 block">Título</label>
                <input id="titulo" type="text" placeholder="Titulo da tarefa" className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required />
                <label className="uppercase text-xs font-bold mb-2 block">Descrição</label>
                <textarea id="descricao" placeholder="Descrição" className="pl-3 h-30 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required></textarea> 
                <button onClick={event => setCriarTarefaCtrl(criarTarefaCtrl + 1)} id="btnsave" type="submit" className="w-full h-10 rounded bg-purple-400 hover:bg-purple-600 duration-200 hover:text-white font-bold">Cadastrar</button>
            </form>
        </div>
        <div id="form-editar" className="w-100 p-4 rounded-lg bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 invisible duration-200 delay-200">
            <div className="flex justify-end">
                <BiX onClick={event => setFecharFormEditarCtrl(fecharFormEditarCtrl + 1)} name='x' className="cursor-pointer"/>
            </div>
            <form onSubmit={event => setEditarTarefaCtrl(editarTarefaCtrl + 1)} className="flex flex-col">
                <input type="hidden" id="idEdicao"/>
                <label className="uppercase text-xs font-bold mb-2 block">Título</label>
                <input id="tituloEdicao" type="text" placeholder="Titulo da tarefa" className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required />
                <label className="uppercase text-xs font-bold mb-2 block">Descrição</label>
                
                <textarea id="descricaoEdicao" placeholder="Descrição" className="pl-3 h-30 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required></textarea> 
                <button onClick={event => setEditarTarefaCtrl(editarTarefaCtrl + 1)} id="btnsaveEdicao" type="submit" className="w-full h-10 rounded bg-purple-400 hover:bg-purple-600 duration-200 hover:text-white font-bold">Salvar</button>
            </form>
        </div>
    </main>
      
      
      )}
    </>
  );
};
export default Cards;