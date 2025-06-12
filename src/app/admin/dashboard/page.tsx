'use client';

import { Title } from '@/src/components/Title';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useEffect, useState } from 'react';
import { getSaleByCategory } from '@/src/services/Sale.service';
import { StyledContentHeader } from '../styles';
import { Container, GraphContainer } from './styles';

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#00ff00',
  '#ff00ff',
  '#00ffff',
  '#ff0000',
];

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getSaleByCategory();

      setData(result);

      // Extrair categorias dos dados
      if (result.length > 0) {
        const categoryNames = Object.keys(result[0]).filter(
          key => key !== 'month',
        );
        setCategories(categoryNames as any);
      }

      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setLoading(false);
    }
  };

  if (loading && data.length === 0) {
    return <div style={{ flex: 1 }}>Carregando dados...</div>;
  }

  return (
    <>
      <StyledContentHeader>
        <Title>Dashboard</Title>
        <div style={{ height: 48 }} />
      </StyledContentHeader>
      <Container>
        <Title $size={1.5}>Vendas por categoria</Title>
        <GraphContainer>
          <LineChart data={data} width={800} height={400}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {categories.map((category, index) => (
              <Line
                key={category}
                type="monotone"
                dataKey={category}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </GraphContainer>
      </Container>
    </>
  );
};

export default DashboardPage;
