import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const Dashboard = () => {
  const producers = useSelector((state: RootState) => state.producers.producers);

  const statesData = [...new Set(producers.map(p => p.estado))].map(estado => ({
    name: estado,
    value: producers.filter(p => p.estado === estado).length,
  }));

  const culturesData = [...new Set(producers.flatMap(p => p.culturas))].map(cultura => ({
    name: cultura,
    value: producers.filter(p => p.culturas.includes(cultura)).length,
  }));

  const landUsageData = [
    { name: 'Área Agricultável', value: producers.reduce((sum, p) => sum + p.areaAgricultavel, 0) },
    { name: 'Área de Vegetação', value: producers.reduce((sum, p) => sum + p.areaVegetacao, 0) },
  ];

  const renderPieChart = (data: Array<{ name: string; value: number }>, title: string) => (
    <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      {data.length > 0 ? (
        <PieChart width={180} height={180}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 180,
            width: 180,
            textAlign: 'center',
          }}
        >
          <Typography variant="body1" color="textSecondary">Sem dados disponíveis</Typography>
        </Paper>
      )}
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ padding: '20px', paddingBottom: '80px' }}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <Typography variant="h6">Resumo</Typography>
            <Typography variant="body1">Total de Fazendas: {producers.length}</Typography>
            <Typography variant="body1">Total de Área em Hectares: {producers.reduce((sum, p) => sum + p.areaTotal, 0)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          {renderPieChart(statesData, 'Gráfico de Pizza por Estado')}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderPieChart(culturesData, 'Gráfico de Pizza por Cultura')}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderPieChart(landUsageData, 'Gráfico de Pizza por Uso de Solo')}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;