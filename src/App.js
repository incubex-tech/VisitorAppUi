import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './component/AppRouter/AppRouter'
import CheckIn from './component/ChekIn/checkIn'
import LoginForm from './component/sms'

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      {/* <CheckIn /> */}
      {/* <LoginForm /> */}
    </BrowserRouter>
  )
}

export default App
