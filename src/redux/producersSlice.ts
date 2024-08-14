import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockProducers from '../mocks/producerMock.json'

interface Producer {
  cpfCnpj: string;
  nomeProdutor: string;
  nomeFazenda: string;
  cidade: string;
  estado: string;
  areaTotal: number;
  areaAgricultavel: number;
  areaVegetacao: number;
  culturas: string[];
}

interface ProducersState {
  producers: Producer[];
}

const initialState: ProducersState = {
  producers: mockProducers as Producer[],
};

const producersSlice = createSlice({
  name: 'producers',
  initialState,
  reducers: {
    addProducer: (state, action: PayloadAction<Producer>) => {
      state.producers.push(action.payload);
    },
  },
});

export const { addProducer } = producersSlice.actions;
export default producersSlice.reducer;
