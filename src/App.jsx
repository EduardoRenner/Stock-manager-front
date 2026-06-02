import { BrowserRouter, Routes, Route } from "react-router-dom"
import Itens from "./pages/Itens"
import Movimentacoes from "./pages/Movimentacoes"
import Relatorio from "./pages/Relatorio"
import Navbar from "./components/Navbar"


function App() {
  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-6">Sistema de controle de estoque</h1>
      <BrowserRouter> 
      <Navbar />
      <Routes>  
        <Route path="/itens" element={<Itens />} />
        <Route path="/movimentacoes" element={<Movimentacoes />} />
        <Route path="/relatorio" element={<Relatorio />} />
      </Routes>
      </BrowserRouter>
  </div>
  </>
  )
}

export default App
