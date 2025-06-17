'use client';

import {
  LoginWaveLeftImg,
  LoginWaveRightImg,
  LogoFullWhiteImg,
} from '@/public';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import {
  StyledMain,
  Wave1,
  Wave2,
  StyledContent,
  StyledButtonContainer,
  BackContainer,
  CreateAccount,
} from './styles';

import Button from '../components/Button';
import { Title } from '../components/Title';
import { ILoginSchema, LoginSchema } from '../validations/loginSchema';
import ICustomer from '../interfaces/ICustomer';
import useAuthStore from '../store/CustomerShopStore';
import { getCustomerToLogin } from '../services/Customer.service';
import BackButton from '../components/BackButton';
import InputField from '../components/InputField';
import ModalCreateCustomer from '../components/ModalCustomerCreate';
import { errorModal } from '../utils/Toasts';
import { useCountries, useCountries2 } from '../store/CountryStore';

const Login = () => {
  const { fetchCountries } = useCountries();
  const { fetchCountries: fetchCountries2 } = useCountries2();
  const [loginType, setLoginType] = useState(0);
  const { customer, loadUser, login } = useAuthStore();
  const [isCreateCustomerOpen, setIsCreateCustomerOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCountries();
    fetchCountries2();
    loadUser();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginSchema>({
    resolver: yupResolver(LoginSchema),
    mode: 'onBlur',
  });

  const handleLogin = (data: ILoginSchema) => {
    if (loginType === 1) {
      customerLogin(data);
    } else if (loginType === 2) {
      adminLogin(data);
    }
  };

  const customerLogin = async (data: ILoginSchema) => {
    try {
      const customerTemp: Partial<ICustomer> = {
        email: data.email,
        password: data.password,
      };

      const customerData = await getCustomerToLogin(customerTemp);

      login(customerData);
      router.push('/shop');
    } catch (error: any) {
      errorModal(error.response.data);
    }
  };

  const adminLogin = (data: ILoginSchema) => {
    const adminEmail = 'admin@admin';
    const adminPassword = 'Aa12345@';

    if (data.email === adminEmail && data.password === adminPassword) {
      router.push('/admin/customers');
    } else {
      errorModal('Credenciais inválidas');
    }
  };

  const handleCustomerLogin = () => {
    if (customer) {
      router.push('/shop');
    } else {
      setLoginType(1);
    }
  };

  return (
    <>
      <ModalCreateCustomer
        isOpen={isCreateCustomerOpen}
        setIsOpen={setIsCreateCustomerOpen}
      />
      <StyledMain>
        <Wave1 src={LoginWaveLeftImg} alt="backgorund wave" />
        <Wave2 src={LoginWaveRightImg} alt="backgorund wave" />
        <StyledContent>
          {loginType !== 0 && (
            <BackContainer>
              <BackButton
                onClick={() => {
                  setLoginType(0);
                  reset();
                }}
              />
              Voltar
            </BackContainer>
          )}
          <Image src={LogoFullWhiteImg} alt="Logo" priority />
          <StyledButtonContainer>
            {loginType === 0 && (
              <>
                <Button onClick={handleCustomerLogin}>Sou cliente</Button>
                <Button
                  onClick={() => {
                    setLoginType(2);
                  }}
                  wired
                >
                  Sou administrador
                </Button>
              </>
            )}
            {loginType === 1 && <Title $align="center">Área do cliente</Title>}
            {loginType === 2 && (
              <Title $align="center">Área do administrador</Title>
            )}
            {loginType !== 0 && (
              <>
                <InputField
                  id="email"
                  placeholder="Insira seu e-mail"
                  label="E-mail"
                  register={register}
                  inputType="email"
                  error={errors.email?.message}
                />
                <InputField
                  id="password"
                  label="Senha"
                  placeholder="Insira sua senha"
                  register={register}
                  error={errors.password?.message}
                  type="password"
                />

                <Button submit onClick={handleSubmit(handleLogin)}>
                  Entrar
                </Button>
              </>
            )}
            {loginType === 1 && (
              <CreateAccount onClick={() => setIsCreateCustomerOpen(true)}>
                Cadastrar cliente
              </CreateAccount>
            )}
          </StyledButtonContainer>
        </StyledContent>
      </StyledMain>
      <ToastContainer />
    </>
  );
};

export default Login;
