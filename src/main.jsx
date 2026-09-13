import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import '@/index.css'
import App from '@/app.jsx'
import { loggedOut, restoreAuthSession } from '@redux/auth/auth.action'
import { AUTH_SESSION_INVALID_EVENT } from '@redux/auth/auth.storage'
import { store } from '@redux/store'

store.dispatch(restoreAuthSession())
window.addEventListener(AUTH_SESSION_INVALID_EVENT, () => {
  store.dispatch(loggedOut())
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
