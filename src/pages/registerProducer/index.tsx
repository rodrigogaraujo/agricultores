import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addProducer } from '../../redux/producersSlice';
import { MenuItem, Select, FormControl, TextField, Button, Grid, InputLabel } from '@mui/material';
import { isValidCNPJ, isValidCPF } from '../../utils/validators';

const schema = yup.object().shape({
  cpfCnpj: yup.string()
    .required('CPF ou CNPJ é obrigatório')
    .test('is-valid-cpf-cnpj', 'CPF ou CNPJ inválido', (value) => {
      if (!value) return false;
      const onlyNumbers = value.replace(/[^\d]/g, '');
      return onlyNumbers.length === 11 ? isValidCPF(onlyNumbers) : onlyNumbers.length === 14 ? isValidCNPJ(onlyNumbers) : false;
    }),
  nomeProdutor: yup.string().required('Nome do produtor é obrigatório'),
  nomeFazenda: yup.string().required('Nome da fazenda é obrigatório'),
  cidade: yup.string().required('Cidade é obrigatória'),
  estado: yup.string().required('Estado é obrigatório'),
  areaTotal: yup.number().required('Área total é obrigatória').min(0, 'Área total deve ser positiva'),
  areaAgricultavel: yup.number().required('Área agricultável é obrigatória').min(0, 'Área agricultável deve ser positiva'),
  areaVegetacao: yup.number().required('Área de vegetação é obrigatória').min(0, 'Área de vegetação deve ser positiva'),
  culturas: yup.array().of(yup.string()).required('Culturas são obrigatórias').min(1, 'Pelo menos uma cultura deve ser selecionada'),
});

interface FormValues {
  cpfCnpj: string;
  nomeProdutor: string;
  nomeFazenda: string;
  cidade: string;
  estado: string;
  areaTotal: number | string;
  areaAgricultavel: number | string;
  areaVegetacao: number | string;
  culturas: string[];
}

const RegisterProducer = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema as unknown as yup.ObjectSchema<FormValues>),
    defaultValues: {
      cpfCnpj: '',
      nomeProdutor: '',
      nomeFazenda: '',
      cidade: '',
      estado: '',
      areaTotal: '',
      areaAgricultavel: '',
      areaVegetacao: '',
      culturas: [],
    },
  });

  const [formKey, setFormKey] = React.useState(0);
  
  const onSubmit = (data: FormValues) => {
    const payload = {
      ...data,
      areaTotal: Number(data.areaTotal),
      areaAgricultavel: Number(data.areaAgricultavel),
      areaVegetacao: Number(data.areaVegetacao),
    };
    
    dispatch(addProducer(payload));
    reset({
      cpfCnpj: '',
      nomeProdutor: '',
      nomeFazenda: '',
      cidade: '',
      estado: '',
      areaTotal: '',
      areaAgricultavel: '',
      areaVegetacao: '',
      culturas: [],
    });
    setFormKey(prevKey => prevKey + 1);
  };

  return (
    <div style={{ padding: '15px'}}>
      <h1>Cadastro de Produtor Rural</h1>
      <form key={formKey} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="cpfCnpj"
                control={control}
                render={({ field }) => <TextField {...field} label="CPF ou CNPJ" error={!!errors.cpfCnpj} helperText={errors.cpfCnpj?.message} />}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="nomeProdutor"
                control={control}
                render={({ field }) => <TextField {...field} label="Nome do Produtor" error={!!errors.nomeProdutor} helperText={errors.nomeProdutor?.message} />}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="nomeFazenda"
                control={control}
                render={({ field }) => <TextField {...field} label="Nome da Fazenda" error={!!errors.nomeFazenda} helperText={errors.nomeFazenda?.message} />}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="cidade"
                control={control}
                render={({ field }) => <TextField {...field} label="Cidade" error={!!errors.cidade} helperText={errors.cidade?.message} />}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="estado"
                control={control}
                render={({ field }) => <TextField {...field} label="Estado" error={!!errors.estado} helperText={errors.estado?.message} />}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="areaTotal"
                control={control}
                render={({ field }) => <TextField {...field} label="Área Total" type="number" error={!!errors.areaTotal} />}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="areaAgricultavel"
                control={control}
                render={({ field }) => <TextField {...field} label="Área Agricultável" type="number" error={!!errors.areaAgricultavel} />}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="areaVegetacao"
                control={control}
                render={({ field }) => <TextField {...field} label="Área de Vegetação" type="number" error={!!errors.areaVegetacao} />}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Selecione as culturas plantadas</InputLabel>
              <Controller
                name="culturas"
                control={control}
                render={({ field }) => (
                  <Select
                    multiple
                    value={field.value || []}
                    onChange={(e) => field.onChange(e.target.value)}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                    error={!!errors.culturas}
                    label="Selecione as culturas plantadas"
                  >
                    <MenuItem value="Soja">Soja</MenuItem>
                    <MenuItem value="Milho">Milho</MenuItem>
                    <MenuItem value="Algodão">Algodão</MenuItem>
                    <MenuItem value="Café">Café</MenuItem>
                    <MenuItem value="Cana de Açúcar">Cana de Açúcar</MenuItem>
                  </Select>
                )}
              />
              {errors.culturas && <p>{errors.culturas.message}</p>}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default RegisterProducer;
