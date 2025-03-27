"use client";
import {
   BackIcon,
   LoginWaveLeftImg,
   LoginWaveRightImg,
   LogoFullWhiteImg,
} from "@/public";

import {
   StyledMain,
   Wave1,
   Wave2,
   StyledContent,
   StyledButtonContainer,
   BackContainer,
   CreateAccount,
} from "./styles";

import Image from "next/image";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { Title } from "../components/Title";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginSchema, loginSchema } from "../validations/loginSchema";
import { toast, ToastContainer } from "react-toastify";
import ICustomer from "../interfaces/ICustomer";
import CreateCustomerFlow from "../components/CreateCustomerFlow";
import { useCreateModalStore } from "../store/CustomerListingStore";
import useAuthStore from "../store/CustomerShopStore";
import { getCustomer } from "../services/Customer.service";
import { useRouter } from "next/navigation";
import BackButton from "../components/BackButton";
import InputField from "../components/InputField";

export default function Login() {
   const [loginType, setLoginType] = useState(0);
   const { createOpenModal } = useCreateModalStore();
   const login = useAuthStore((state: any) => state.login);
   const { customer, loadUser } = useAuthStore();
   const router = useRouter();

   useEffect(() => {
      loadUser();
   }, []);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<ILoginSchema>({
      resolver: yupResolver(loginSchema),
      mode: "onBlur",
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
         const customer: Partial<ICustomer> = {
            email: data.email,
            password: data.password,
         };
         const customerData = await getCustomer(0, customer as ICustomer);
         login(customerData);
         router.push("/shop");
      } catch (error: any) {
         toast.error(error.response.data);
      }
   };

   const adminLogin = (data: ILoginSchema) => {
      const adminEmail = "admin@admin";
      const adminPassword = "Aa12345@";

      if (data.email === adminEmail && data.password === adminPassword) {
         router.push("/admin/customers");
      } else {
         toast.error("Credenciais inválidas");
      }
   };

   const handleCustomerLogin = () => {
      if (customer) {
         router.push("/shop");
      } else {
         setLoginType(1);
      }
   };

   return (
      <>
         <CreateCustomerFlow />
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
                        <Button onClick={handleCustomerLogin}>
                           Sou cliente
                        </Button>
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
                  {loginType === 1 && (
                     <Title $align="center">Área do cliente</Title>
                  )}
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
                     <CreateAccount onClick={createOpenModal}>
                        Cadastrar cliente
                     </CreateAccount>
                  )}
               </StyledButtonContainer>
            </StyledContent>
         </StyledMain>
         <ToastContainer />
      </>
   );
}
