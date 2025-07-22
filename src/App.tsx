import { BrowserRouter } from "react-router-dom"
import Router from "./routers/Router"
import { AlertProvider } from "./contexts/AlertContext"

function App() {

  return (
    <AlertProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AlertProvider>
  )
}

export default App
