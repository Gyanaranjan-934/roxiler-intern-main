import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TransactionState from './context/transactions/TransactionState.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TransactionState>
      <App />
    </TransactionState>
  </React.StrictMode>,
)
