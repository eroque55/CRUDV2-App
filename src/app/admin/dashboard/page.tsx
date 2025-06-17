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
import ButtonComponent from '@/src/components/Button';
import InputField from '@/src/components/InputField';
import { useForm } from 'react-hook-form';
import Loader from '@/src/components/Loader';
import { StyledContentHeader } from '../styles';
import {
  Container,
  GraphContainer,
  InputsContainer,
  LoaderContainer,
  TitleContainer,
} from './styles';

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

  const { register, handleSubmit, reset } = useForm<{
    from: string;
    to: string;
  }>();

  useEffect(() => {
    fetchData();
  }, []);

  const onReset = () => {
    setLoading(true);
    reset();
    fetchData();
  };

  const onSubmit = (formData: { from: string; to: string }) => {
    const fromDate = formData.from ? new Date(formData.from) : undefined;
    const toDate = formData.to ? new Date(formData.to) : undefined;
    fetchData(fromDate, toDate);
    setLoading(true);
  };

  const fetchData = async (from?: Date, to?: Date) => {
    try {
      const result = await getSaleByCategory(from, to);

      setData(result);

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

  return (
    <>
      <StyledContentHeader>
        <Title>Dashboard</Title>
        <div style={{ height: 48 }} />
      </StyledContentHeader>
      <Container>
        <TitleContainer>
          <Title $size={1.5}>Vendas por categoria</Title>
          <InputsContainer>
            <InputField
              id="from"
              register={register}
              label="De"
              placeholder="dd/mm/aaaa"
              inputType="date"
            />

            <InputField
              id="to"
              register={register}
              label="Até"
              placeholder="dd/mm/aaaa"
              inputType="date"
            />

            <ButtonComponent onClick={handleSubmit(onSubmit)} submit>
              Filtar
            </ButtonComponent>
            <ButtonComponent wired onClick={onReset}>
              Limpar
            </ButtonComponent>
          </InputsContainer>
        </TitleContainer>
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
        {loading && (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        )}
      </Container>
    </>
  );
};

export default DashboardPage;
