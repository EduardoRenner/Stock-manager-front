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
        <h1>Página de Relatórios</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Marca</th>
                    <th>Quantidade</th>
                    <th>Quantidade mínima</th>
                    <th>Validade</th>
                </tr>
            </thead>
            <tbody>
                {itens.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nome}</td>
                        <td>{item.marca}</td>
                        <td>{item.quantidade}</td>
                        <td>{item.estoqueMinimo}</td>
                        {item.dataValidade === null ? (
                            <td>Sem validade</td>
                        ) : (
                            <td>{item.dataValidade}</td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
        </>

    )
}

export default Relatorio