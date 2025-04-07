"use client";

import { useState } from "react";
import {
   Container,
   HeaderContainer,
   ContentContainer,
   Step,
   StepContainer,
   StepBall,
   StepBallContainer,
   MainContainer,
   CardsContainer,
   CardContainer,
   OptionContainer,
   OptionRadius,
   OptionDescription,
   OptionValue,
   ResumeButtonsContainer,
   ResumeContainer,
   ResumeSection,
   ResumeContent,
   TotalValueContainer,
   ImageContainer,
   BookContainer,
   PlusOptionContainer,
   CoupomContainer,
   CoupomInput,
} from "./styles";
import Image from "next/image";
import { LogoFullBlackImg } from "@/public";
import {
   ButtonsContainer,
   SumaryContainer,
   SumaryContent,
   SumaryHeader,
   SumaryItem,
   SumaryItemLabel,
   SumaryItemTotal,
   SumaryItemValue,
   SumaryTitle,
} from "../cart/styles";
import ButtonComponent from "@/src/components/Button";
import { useRouter } from "next/navigation";
import { confirmationModal, successModal } from "@/src/utils/Toasts";
import IconComponent from "@/src/components/Icon";

const CheckoutPage = () => {
   const [step, setStep] = useState(0);
   const router = useRouter();

   const handleBack = () => {
      if (step > 0) {
         setStep(step - 1);
      }
      if (step === 0) {
         confirmationModal({
            title: "Deseja cancelar a compra?",
            message: "Você será redirecionado para a página de carrinho",
            confirmAction: () => router.push("/shop/cart"),
            confirmButton: "Cancelar",
            cancelButton: "Voltar",
         });
      }
   };

   const handleNext = () => {
      if (step < 2) {
         setStep(step + 1);
      }
      if (step === 2) {
         successModal("Compra realizada com sucesso");
      }
   };

   return (
      <Container>
         <HeaderContainer>
            {" "}
            <Image src={LogoFullBlackImg} alt="Logo" />
         </HeaderContainer>
         <ContentContainer>
            <StepContainer>
               <Step $active={step === 0}>
                  <StepBallContainer>
                     <StepBall $active={step === 0}>{step === 0 && 1}</StepBall>
                  </StepBallContainer>
                  Entrega
               </Step>
               <Step $active={step === 1}>
                  <StepBallContainer>
                     <StepBall $active={step === 1}>{step === 1 && 2}</StepBall>
                  </StepBallContainer>
                  Pagamento
               </Step>
               <Step $active={step === 2}>
                  <StepBallContainer>
                     <StepBall $active={step === 2}>{step === 2 && 3}</StepBall>
                  </StepBallContainer>
                  Revisão
               </Step>
            </StepContainer>
            {step != 2 ? (
               <MainContainer>
                  <CardsContainer>
                     {step === 0 ? (
                        <>
                           {" "}
                           <CardContainer>
                              Endereço de entrega
                              <OptionContainer $selected>
                                 <OptionRadius $selected />
                                 Minha casa
                                 <OptionDescription>
                                    Rua das Flores, 123 - Centro, São Paulo - SP
                                 </OptionDescription>
                              </OptionContainer>
                              <OptionContainer>
                                 <OptionRadius />
                                 Meu trabalho
                                 <OptionDescription>
                                    Avenida Central, 456, Centro, Rio de
                                    Janeiro, RJ, CEP 89012-345
                                 </OptionDescription>
                              </OptionContainer>
                              <PlusOptionContainer>
                                 <IconComponent name="PlusCartIcon" />
                              </PlusOptionContainer>
                           </CardContainer>
                           <CardContainer>
                              Transportadora
                              <OptionContainer $selected>
                                 <OptionRadius $selected />
                                 Rápido
                                 <OptionValue>R$ 20,00</OptionValue>
                              </OptionContainer>
                              <OptionContainer>
                                 <OptionRadius />
                                 Padrão
                                 <OptionValue>R$ 35,00</OptionValue>
                              </OptionContainer>
                           </CardContainer>{" "}
                        </>
                     ) : (
                        <>
                           <CardContainer>
                              Cupom
                              <CoupomContainer>
                                 <CoupomInput placeholder="Digite seu cupom" />
                                 <ButtonComponent width="10rem">
                                    Adicionar
                                 </ButtonComponent>
                              </CoupomContainer>
                           </CardContainer>
                           <CardContainer>
                              Cartao de credito
                              <OptionContainer $selected>
                                 <OptionRadius $selected />
                                 MasterCard - 3456
                              </OptionContainer>
                              <OptionContainer>
                                 <OptionRadius />
                                 Visa - 3456
                              </OptionContainer>
                              <PlusOptionContainer>
                                 <IconComponent name="PlusCartIcon" />
                              </PlusOptionContainer>
                           </CardContainer>
                        </>
                     )}
                  </CardsContainer>
                  <SumaryContainer>
                     <SumaryHeader>
                        <SumaryTitle>Carrinho</SumaryTitle>
                        <SumaryContent>
                           <SumaryItem>
                              <SumaryItemLabel>Subtotal</SumaryItemLabel>
                              <SumaryItemValue>R$ 100,00</SumaryItemValue>
                           </SumaryItem>
                           <SumaryItem>
                              <SumaryItemLabel>Descontos</SumaryItemLabel>
                              <SumaryItemValue>-----</SumaryItemValue>
                           </SumaryItem>
                           <SumaryItem>
                              <SumaryItemLabel>Frete</SumaryItemLabel>
                              <SumaryItemValue>-----</SumaryItemValue>
                           </SumaryItem>
                           <SumaryItem>
                              <SumaryItemLabel>Total</SumaryItemLabel>
                              <SumaryItemTotal>R$ 100,00</SumaryItemTotal>
                           </SumaryItem>
                        </SumaryContent>
                     </SumaryHeader>
                     <ButtonsContainer>
                        <ButtonComponent onClick={handleNext}>
                           Proximo
                        </ButtonComponent>
                        <ButtonComponent onClick={handleBack} wired>
                           Voltar
                        </ButtonComponent>
                     </ButtonsContainer>
                  </SumaryContainer>
               </MainContainer>
            ) : (
               <>
                  <ResumeContainer>
                     <ResumeSection>
                        Produtos
                        <ResumeContent>
                           <BookContainer>
                              <p>1x</p>
                              <ImageContainer>
                                 <Image
                                    src={`/books/o-senhor-dos-aneis.jpg`}
                                    alt={`Imagem do livro o senhor dos aneis`}
                                    width={100}
                                    height={100}
                                    style={{ objectFit: "contain" }}
                                 />
                              </ImageContainer>
                              <p>O Senhor dos Anéis</p>
                           </BookContainer>
                           <p>R$ 20,00</p>
                        </ResumeContent>
                     </ResumeSection>
                     <ResumeSection>
                        Entrega
                        <ResumeContent>
                           <p>
                              Minha casa - Rua das Flores, 123, Bairro Jardim,
                              São Paulo, SP, CEP 01234-567(Entrega padrão)
                           </p>
                           <p>R$ 20,00</p>
                        </ResumeContent>
                     </ResumeSection>
                     <ResumeSection>
                        Descontos
                        <ResumeContent>
                           <p>Nenhum desconto aplicado</p>
                           <p>-R$ 00,00</p>
                        </ResumeContent>
                     </ResumeSection>
                     <ResumeSection>
                        Pagamento
                        <ResumeContent>
                           <p>MasterCard - 3456</p>
                        </ResumeContent>
                     </ResumeSection>
                     <TotalValueContainer>
                        <p>Valor total</p>
                        <p> R$ 493,00</p>
                     </TotalValueContainer>
                  </ResumeContainer>
                  <ResumeButtonsContainer>
                     <ButtonComponent onClick={handleBack} wired>
                        Voltar
                     </ButtonComponent>
                     <ButtonComponent onClick={handleNext}>
                        Comprar
                     </ButtonComponent>
                  </ResumeButtonsContainer>
               </>
            )}
         </ContentContainer>
      </Container>
   );
};

export default CheckoutPage;
