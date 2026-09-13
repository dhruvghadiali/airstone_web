import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import '@/index.css'
import App from '@/app.jsx'
import { restoreAuthSession } from '@redux/auth/auth.action'
import { store } from '@redux/store'

store.dispatch(restoreAuthSession())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
