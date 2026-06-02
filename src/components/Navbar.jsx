import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-gray-900 px-6 py-4 flex gap-6">
            <Link to="/itens" className="text-gray-300 hover:text-white">Itens</Link>
            <Link to="/movimentacoes" className="text-gray-300 hover:text-white">Movimentações</Link>
            <Link to="/relatorio" className="text-gray-300 hover:text-white">Relatórios</Link>
        </nav>
    );
}

export default Navbar;