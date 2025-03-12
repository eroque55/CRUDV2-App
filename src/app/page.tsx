"use client";
import Wave1Image from "@/public/images/login-wave1.svg";
import Wave2Image from "@/public/images/login-wave2.svg";
import BackIcon from "@/public/icons/back-button.svg";
import {
   StyledMain,
   Wave1,
   Wave2,
   StyledContent,
   StyledButtonContainer,
   BackContainer,
   BackButton,
   CreateAccount,
} from "./page.styles";
import Image from "next/image";
import { DefaultButton } from "../components/common/button";
import { useState } from "react";
import { StyledTitle } from "../components/admin/common/title";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginSchema, loginSchema } from "../validations/loginSchema";
import {
   StyledField,
   StyledInput,
   StyledErrorSpan,
   StyledFieldTitle,
   StyledLabel,
} from "@/src/components/common/fields/index.styles";
import { toast } from "react-toastify";
import { StyledToastContainer } from "@/src/components/common/toastify/index.styles";
import { Customer } from "../@types/api";
import { getCustomer } from "../services/CustomerService";
import CreateCustomerFlow from "../components/admin/customerListing/createCustomerFlow";
import { useCreateModalStore } from "../store/CustomerListingStore";

export default function Login() {
   const [loginType, setLoginType] = useState(0);
   const { createOpenModal } = useCreateModalStore();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<ILoginSchema>({
      resolver: yupResolver(loginSchema),
      mode: "onBlur",
   });

   const login = (data: ILoginSchema) => {
      if (loginType === 1) {
         customerLogin(data);
      } else if (loginType === 2) {
         adminLogin(data);
      }
   };

   const customerLogin = async (data: ILoginSchema) => {
      try {
         const customer: Partial<Customer> = {
            email: data.email,
            password: data.password,
         };
         const respCustomer = await getCustomer(0, customer as Customer);
         window.location.href = `/customer/${respCustomer.id}`;
      } catch (error: any) {
         toast.error(error.response.data);
      }
   };

   const adminLogin = (data: ILoginSchema) => {
      const adminEmail = "admin@admin";
      const adminPassword = "12@Admin";

      if (data.email === adminEmail && data.password === adminPassword) {
         window.location.href = "/admin";
      } else {
         toast.error("Credenciais inválidas");
      }
   };

   return (
      <>
         <CreateCustomerFlow />
         <StyledToastContainer />
         <StyledMain>
            <Wave1 src={Wave1Image} alt="backgorund wave" />
            <Wave2 src={Wave2Image} alt="backgorund wave" />
            <StyledContent>
               {loginType !== 0 && (
                  <BackContainer>
                     <BackButton
                        onClick={() => {
                           setLoginType(0);
                           reset();
                        }}
                     >
                        <Image src={BackIcon} alt="Icone de voltar"></Image>
                     </BackButton>
                     Voltar
                  </BackContainer>
               )}
               <Image
                  src={"/images/white-logo.svg"}
                  alt="Logo"
                  priority
                  width={317}
                  height={83}
               />
               <StyledButtonContainer>
                  {loginType === 0 && (
                     <>
                        <DefaultButton
                           onClick={() => {
                              setLoginType(1);
                           }}
                        >
                           Sou cliente
                        </DefaultButton>
                        <DefaultButton
                           onClick={() => {
                              setLoginType(2);
                           }}
                           wired
                        >
                           Sou administrador
                        </DefaultButton>
                     </>
                  )}
                  {loginType === 1 && (
                     <StyledTitle $align="center">Área do cliente</StyledTitle>
                  )}
                  {loginType === 2 && (
                     <StyledTitle $align="center">
                        Área do administrador
                     </StyledTitle>
                  )}
                  {loginType !== 0 && (
                     <>
                        <StyledField>
                           <StyledFieldTitle>
                              <StyledLabel>E-mail</StyledLabel>
                              {errors.email && (
                                 <StyledErrorSpan>
                                    {errors.email.message}
                                 </StyledErrorSpan>
                              )}
                           </StyledFieldTitle>
                           <StyledInput {...register("email")} />
                        </StyledField>

                        <StyledField>
                           <StyledFieldTitle>
                              <StyledLabel>Senha</StyledLabel>
                              {errors.password && (
                                 <StyledErrorSpan>
                                    {errors.password.message}
                                 </StyledErrorSpan>
                              )}
                           </StyledFieldTitle>
                           <StyledInput
                              type="password"
                              {...register("password")}
                           />
                        </StyledField>

                        <DefaultButton onClick={handleSubmit(login)}>
                           Entrar
                        </DefaultButton>
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
      </>
   );
}
