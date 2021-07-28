// importação do React
import React from 'react';
// importação do Provider
import AppProvider from './context/AppProvider';
// importação do componenet Table
import Table from './components/Table';
// importação do componente Form
import Form from './components/Form';
// CSS padrão
import './App.css';

function App() {
  return (
    <AppProvider>
      <Form />
      <Table />
    </AppProvider>
  );
}

export default App;
