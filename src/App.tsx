import './App.css'
import AppRouter from './router/AppRouter'
import { CartProvider } from "@/contexts";

function App() {

  return (
    <>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </>
  )
}

export default App
