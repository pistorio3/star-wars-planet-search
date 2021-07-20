import React from 'react';
import AppProvider from './context/AppProvider';
import Table from './components/Table';
import Form from './components/Form';
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
