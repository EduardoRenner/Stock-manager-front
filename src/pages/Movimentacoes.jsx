import { useState, useEffect } from "react"

function Movimentacoes() {

  const [itens, setItens] = useState([])

  const [movimentacoes, setMovimentacoes] = useState([])

  const [movimentacao, setMovimentacao] = useState({
    item: '',
    quantidade: '',
    tipo: ''
  })

  const itemSelecionado = itens.find(item => item.id === Number(movimentacao.item));

    useEffect(() => {
      fetch("http://localhost:8080/itens")
      .then(response => response.json())
      .then(data => setItens(data))
      .catch(error => console.error("Erro ao buscar itens:", error));
    }, [])

  const handleHistorico = (movimentacao) => {
    fetch(`http://localhost:8080/movimentacoes/${movimentacao.item}`)
      .then(res => res.json())
      .then(data => {
        setMovimentacoes(data);
      })
      .catch(error => console.error("Erro ao buscar histórico:", error));
  };

  const handleSalvarMovimentacao = (e) => {

    const corpo = {
        item: { id: Number(movimentacao.item) },
        quantidade: Number(movimentacao.quantidade),
        tipo: movimentacao.tipo.toUpperCase()
    }

    e.preventDefault();
    
    const url = movimentacao.tipo === "ENTRADA" 
    ? "http://localhost:8080/movimentacoes/entrada" 
    : "http://localhost:8080/movimentacoes/saida";

    const mensagem = movimentacao.tipo === "ENTRADA"
    ? "Entrada registrada com sucesso!"
    : "Saída registrada com sucesso!";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(corpo)
    })
    .then(() => {
      alert(mensagem);
      window.location.reload();
    })
    .catch(error => console.error("Erro ao registrar movimentação:", error));
  };
  
  return ( 
    <> 
    <div className="p-1 bg-white rounded-lg shadow p-1 mt-1 flex flex-col gap-3">
      <h1 className="text-2xl text-center py-6">Página de Movimentações</h1>
      <select className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500"
        name="item"
        value={movimentacao.item}
        onChange={(e) => setMovimentacao({ ...movimentacao, item: e.target.value })}
      >
        <option className="hover:bg-gray-300" value="">Selecione um item para movimentar</option>
        {itens.map(item => (
        <option className="hover:bg-gray-300" key={item.id} value={item.id}>{item.nome}</option>
        ))}
      </select>
      <input className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500"
        name="quantidade"
        value={movimentacao.quantidade}
        onChange={(e) => setMovimentacao({...movimentacao, quantidade: e.target.value})}
        placeholder={itemSelecionado ? 'Quantidade disponível: ' + itemSelecionado.quantidade : 'Digite a quantidade'}
      />
      <select className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500"
        name="tipo"
        value={movimentacao.tipo}
        onChange={(e) => setMovimentacao({...movimentacao, tipo: e.target.value})}
      >
        <option value="">Selecione o tipo de movimentação</option>
        <option value="ENTRADA">Entrada</option>
        <option value="SAIDA">Saída</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleSalvarMovimentacao}>
      Salvar movimentação
      </button>
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleHistorico(movimentacao)}>
      Ver histórico
      </button>
    </div>
    {movimentacoes.length > 0 && (
      <div className="p-6">
        <table className="w-full border-collapse bg-white rounded-lg shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left px-4 py-3">ID</th>
              <th className="text-left px-4 py-3">Item</th>
              <th className="text-left px-4 py-3">Quantidade</th>
              <th className="text-left px-4 py-3">Tipo</th>
              <th className="text-left px-4 py-3">Data e horário</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map(mov => (
              <tr key={mov.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">{mov.id}</td>
                <td className="px-4 py-3">{mov.item.nome}</td>
                <td className="px-4 py-3">{mov.quantidade}</td>
                <td className="px-4 py-3">{mov.tipo}</td>
                <td className="px-4 py-3">{new Date(mov.dataHora).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    </>
  )
}



export default Movimentacoes