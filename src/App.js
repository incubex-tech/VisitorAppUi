import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './component/AppRouter/AppRouter'
import CheckIn from './component/ChekIn/checkIn'

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      {/* <CheckIn /> */}
    </BrowserRouter>
  )
}

export default App
