import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import producersSlice from '../../../redux/producersSlice';
import RegisterProducer from '../../registerProducer';

test('should dispatch addProducer action with correct payload', async () => {
  
  const store = configureStore({
    reducer: {
      producers: producersSlice,
    },
  });

  render(
    <Provider store={store}>
      <RegisterProducer />
    </Provider>
  );

  fireEvent.change(screen.getByLabelText(/CPF ou CNPJ/i), { target: { value: '12345678901' } });
  fireEvent.change(screen.getByLabelText(/Nome do Produtor/i), { target: { value: 'João da Silva' } });
  fireEvent.change(screen.getByLabelText(/Nome da Fazenda/i), { target: { value: 'Fazenda São João' } });
  fireEvent.change(screen.getByLabelText(/Cidade/i), { target: { value: 'São Paulo' } });
  fireEvent.change(screen.getByLabelText(/Estado/i), { target: { value: 'SP' } });
  fireEvent.change(screen.getByLabelText(/Área Total/i), { target: { value: 100 } });
  fireEvent.change(screen.getByLabelText(/Área Agricultável/i), { target: { value: 60 } });
  fireEvent.change(screen.getByLabelText(/Área de Vegetação/i), { target: { value: 30 } });

  fireEvent.click(screen.getByText(/Cadastrar/i));


});