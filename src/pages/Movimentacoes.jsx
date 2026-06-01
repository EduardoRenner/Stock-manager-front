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

    const corpo = {
    item: { id: Number(movimentacao.item) },
    quantidade: Number(movimentacao.quantidade),
    tipo: movimentacao.tipo.toUpperCase()
    }

    console.log(movimentacao);
    fetch(`http://localhost:8080/movimentacoes/${movimentacao.item}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
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
    <h1>Página de Movimentações</h1>
    <select
      name="item"
      value={movimentacao.item}
      onChange={(e) => setMovimentacao({ ...movimentacao, item: e.target.value })}
      >
    <option value="">Selecione um item para movimentar</option>
    {itens.map(item => (
      <option key={item.id} value={item.id}>{item.nome}</option>
    ))}
  </select>
  <input
    name="quantidade"
    value={movimentacao.quantidade}
    onChange={(e) => setMovimentacao({...movimentacao, quantidade: e.target.value})}
    placeholder={itemSelecionado ? 'Quantidade disponível: ' + itemSelecionado.quantidade : 'Digite a quantidade'}
    />
  <select
    name="tipo"
    value={movimentacao.tipo}
    onChange={(e) => setMovimentacao({...movimentacao, tipo: e.target.value})}
  >
    <option value="">Selecione o tipo de movimentação</option>
    <option value="ENTRADA">Entrada</option>
    <option value="SAIDA">Saída</option>
  </select>
  <button onClick={handleSalvarMovimentacao}>Salvar movimentação</button>
  <button onClick={() => handleHistorico(movimentacao)}>Ver histórico</button>
  {movimentacoes.length > 0 && (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Item</th>
          <th>Quantidade</th>
          <th>Tipo</th>
          <th>Data e horário</th>
        </tr>
      </thead>
      <tbody>
        {movimentacoes.map(mov => (
          <tr key={mov.id}>
            <td>{mov.id}</td>
            <td>{mov.item.nome}</td>
            <td>{mov.quantidade}</td>
            <td>{mov.tipo}</td>
            <td>{new Date(mov.dataHora).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
  </>
  )
}



export default Movimentacoes