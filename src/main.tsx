import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { persistor, store } from '../store'
// import LoginPage from './pages/login.tsx'
import  AppRouter  from '../router/app-router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
          {/* <LoginPage/> */}
          {/* <App/> */}
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
