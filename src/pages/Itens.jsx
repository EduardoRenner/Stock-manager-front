import React, { useState, useEffect } from 'react';

function Itens() {
  
  const [itens, setItens] = useState([]);

  const [cadastroItem, setCadastroItem] = useState({
      nome: '',
      marca: '',
      dataValidade: '',
      quantidade: '',
      estoqueMinimo: '' 
  });

  const [editarItem, setEditarItem] = useState(null);

 const handleInputChange = (e) => {
    const { name, value } = e.target;
    const dadosAtualizados = { ...cadastroItem, [name]: value };
    setCadastroItem(dadosAtualizados);
  } 

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      fetch(`http://localhost:8080/itens/${id}`, {
        method: "DELETE",
      })
      .then(() => {
        alert("Item excluído com sucesso!")
        window.location.reload();
      })
    }
  }

  const handleUpdate = (item) => {
    setEditarItem(item);
    setCadastroItem({
      nome: item.nome,
      marca: item.marca,
      dataValidade: item.dataValidade,
      quantidade: item.quantidade,
      estoqueMinimo: item.estoqueMinimo
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editarItem != null) {
      fetch(`http://localhost:8080/itens/${editarItem.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body : JSON.stringify(cadastroItem)
      })
      .then(() => {  
    alert("Item atualizado com sucesso!")
    window.location.reload()
    })
    } else {
    fetch("http://localhost:8080/itens", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body : JSON.stringify(cadastroItem)
    }
  )
  .then(() => {  
    alert("Item cadastrado com sucesso!")
    window.location.reload()
  })
  .catch(error => console.error("Erro ao cadastrar item:", error));
  }
}
  
  useEffect(() => {
    fetch("http://localhost:8080/itens")
    .then(response => response.json())
    .then(data => setItens(data))
    .catch(error => console.error("Erro ao buscar itens:", error));
  }, [])


  return (
    <>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Marca</th>
          <th>Quantidade</th>
          <th>Data de Validade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {itens.map(item => (
          <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.nome}</td>
          <td>{item.marca}</td>
          <td>{item.quantidade}</td>
          {item.dataValidade === null ? (
            <td>Sem validade</td>
          ) : (
            <td>{item.dataValidade}</td>
          )}
          <td>
            <button onClick={() => handleUpdate(item)}>✏️</button>
            <button onClick={() => handleDelete(item.id)}>🗑️</button>
          </td>
          </tr>
        ))}
      </tbody>
    </table>
    <h2>{editarItem ? "Editar Item" : "Cadastrar Item"}</h2>
    <input 
      name="nome" 
      value={cadastroItem.nome} 
      onChange={handleInputChange} 
      placeholder="Nome do item" 
    />
    <input
      name="marca"
      value={cadastroItem.marca}
      onChange={handleInputChange}
      placeholder="Marca"
    />
    <input
      name="dataValidade"
      value={cadastroItem.dataValidade}
      onChange={handleInputChange}
      placeholder="Data de Validade: Opcional"
      />
    <input
      name="quantidade"
      value={cadastroItem.quantidade}
      onChange={handleInputChange}
      placeholder="quantidade"
    />
    <input
      name="estoqueMinimo"
      value={cadastroItem.estoqueMinimo}
      onChange={handleInputChange}
      placeholder="quantidade mínima"
    />
    <button onClick={handleSubmit}>{editarItem ? "Atualizar" : "Cadastrar"}</button>
    
    </>
  )        
}


export default Itens