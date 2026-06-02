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
    <div className="p-1 bg-white rounded-lg shadow p-1 mt-1 flex flex-col gap-3">
      <h1 className="text-2xl text-center py-6">Página de Itens</h1>
      <table className="w-full border-collapse bg-white rounded-lg shadow py-6">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-left px-4 py-3">ID</th>
            <th className="text-left px-4 py-3">Nome</th>
            <th className="text-left px-4 py-3">Marca</th>
            <th className="text-left px-4 py-3">Quantidade</th>
            <th className="text-left px-4 py-3">Data de Validade</th>
            <th className="text-left px-4 py-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens.map(item => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="px-4 py-3">{item.id}</td>
            <td className="px-4 py-3">{item.nome}</td>
            <td className="px-4 py-3">{item.marca}</td>
            <td className="px-4 py-3">{item.quantidade}</td>
            {item.dataValidade === null ? (
              <td className="px-4 py-3">Sem validade</td>
            ) : (
              <td className="px-4 py-3">{item.dataValidade}</td>
            )}
            <td >
              <button className="px-4 py-3 border-b border-gray-900 hover:bg-gray-50 rounded-lg shadow" onClick={() => handleUpdate(item)}>✏️</button>
              <button className="px-4 py-3 border-b border-gray-900 hover:bg-gray-50 rounded-lg shadow"  onClick={() => handleDelete(item.id)}>🗑️</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-white rounded-lg shadow p-6 mt-6 flex flex-col gap-3">
        <h2>{editarItem ? "Editar Item" : "Cadastrar Item"}</h2>
        <input className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500"
          name="nome" 
          value={cadastroItem.nome} 
          onChange={handleInputChange} 
          placeholder="Nome do item" 
          />
        <input className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500"
          name="marca"
          value={cadastroItem.marca}
          onChange={handleInputChange}
          placeholder="Marca"
          />
        <input className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500"
          name="dataValidade"
          value={cadastroItem.dataValidade}
          onChange={handleInputChange}
          placeholder="Data de Validade: Opcional"
          />
        <input className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500"
          name="quantidade"
          value={cadastroItem.quantidade}
          onChange={handleInputChange}
          placeholder="quantidade"
          />
        <input className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500"
          name="estoqueMinimo"
          value={cadastroItem.estoqueMinimo}
          onChange={handleInputChange}
          placeholder="quantidade mínima"
          />
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editarItem ? "Atualizar" : "Cadastrar"}
        </button>
      </div>
    </div>
    </>
  )        
}


export default Itens