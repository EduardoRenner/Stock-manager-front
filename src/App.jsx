import { BrowserRouter, Routes, Route } from "react-router-dom"
import Itens from "./pages/Itens"
import Movimentacoes from "./pages/Movimentacoes"
import Relatorio from "./pages/Relatorio"
import Navbar from "./components/Navbar"


function App() {
  return <><h1>Sistema de controle de estoque</h1>
  <BrowserRouter> 
  <Navbar />
  <Routes>  
  <Route path="/itens" element={<Itens />} />
  <Route path="/movimentacoes" element={<Movimentacoes />} />
  <Route path="/relatorio" element={<Relatorio />} />
  </Routes> </BrowserRouter>
  </>
}

export default App
