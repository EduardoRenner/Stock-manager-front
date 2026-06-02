import React, { useState, useEffect } from 'react';

function Relatorio() {

    const [itens, setItens] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/itens/relatorio")
        .then(response => response.json())
        .then(data => setItens(data))
        .catch(error => console.error("Erro ao buscar itens:", error));
    }, [])


    return( 
        <>
        <div className="p-1 bg-white rounded-lg shadow p-1 mt-1 flex flex-col gap-3">
            <h1 className="text-2xl text-center py-6">Página de Relatórios</h1>
            <table className="w-full border-collapse bg-white rounded-lg shadow py-6">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left px-4 py-3">ID</th>
                        <th className="text-left px-4 py-3">Nome</th>
                        <th className="text-left px-4 py-3">Marca</th>
                        <th className="text-left px-4 py-3">Quantidade</th>
                        <th className="text-left px-4 py-3">Quantidade mínima</th>
                        <th className="text-left px-4 py-3">Validade</th>
                    </tr>
                </thead>
                <tbody>
                    {itens.map(item => (
                        <tr className="border-b border-gray-200 hover:bg-gray-50" key={item.id}>
                            <td className="px-4 py-3">{item.id}</td>
                            <td className="px-4 py-3">{item.nome}</td>
                            <td className="px-4 py-3">{item.marca}</td>
                            <td className="px-4 py-3">{item.quantidade}</td>
                            <td className="px-4 py-3">{item.estoqueMinimo}</td>
                            {item.dataValidade === null ? (
                                <td className="px-4 py-3">Sem validade</td>
                            ) : (
                                <td className="px-4 py-3">{item.dataValidade}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>

    )
}

export default Relatorio