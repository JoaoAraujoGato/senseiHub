import './App.css'
import { GlobalStyled } from './GlobalStyled'
import { DashboardPage } from './pages/dashboard/DashboardPage'
// import { HomePage } from './pages/home/HomePage'

function App() {
  return (
    <>
      <GlobalStyled />
      {/* <HomePage /> */}
      <DashboardPage />
    </>
  )
}

export default App
