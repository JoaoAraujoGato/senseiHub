import './App.css'
import { GlobalStyled } from './GlobalStyled'
import { FaixasPage } from './pages/faixas/FaixasPage'
// import { DashboardPage } from './pages/dashboard/DashboardPage'
// import { HomePage } from './pages/home/HomePage'

function App() {
  return (
    <>
      <GlobalStyled />
      {/* <HomePage /> */}
      {/* <DashboardPage /> */}
      <FaixasPage />
    </>
  )
}

export default App
