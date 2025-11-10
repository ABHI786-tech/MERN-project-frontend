import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import './index.css'
import App from './App.jsx'
import store from "./redux/store.js";
import { BrowserRouter } from 'react-router-dom'
import { MainContextProvider } from "./context/mainContext.jsx"

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <BrowserRouter>
      <MainContextProvider>
        <App />
      </MainContextProvider>
    </BrowserRouter>
  </Provider>
)
