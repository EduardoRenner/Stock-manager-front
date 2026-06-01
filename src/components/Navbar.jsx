import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/itens">Itens</Link>
            <Link to="/movimentacoes">Movimentações</Link>
            <Link to="/relatorio">Relatórios</Link>
        </nav>
    );
}

export default Navbar;