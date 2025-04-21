"use client";

import { useEffect, useState } from "react";
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
   OptionText,
   CreditCardsContainer,
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
import {
   confirmationModal,
   errorModal,
   successModal,
} from "@/src/utils/Toasts";
import IconComponent from "@/src/components/Icon";
import useAuthStore from "@/src/store/CustomerShopStore";
import { getCustomer } from "@/src/services/Customer.service";
import { getCarriers } from "@/src/services/Carriers.service";
import ICarrier from "@/src/interfaces/ICarrier";
import IAddress from "@/src/interfaces/IAddress";
import ICard from "@/src/interfaces/ICard";
import { getCart } from "@/src/services/Cart.service";
import { formatValue, getBookValue, getBookValueNumber } from "@/src/utils";
import IFreight from "@/src/interfaces/IFreight";
import ISale from "@/src/interfaces/ISale";
import ICardToSale from "@/src/interfaces/ICardToSale";
import ICart from "@/src/interfaces/ICart";
import { createSale } from "@/src/services/Sale.service";
import Radius from "@/src/components/Radius";
import CheckBox from "@/src/components/CheckBox";

const CheckoutPage = () => {
   const { customer } = useAuthStore();
   const { data: customerData } = getCustomer(customer?.id || 0);
   const [carriers, setCarriers] = useState<ICarrier[]>([]);
   const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(
      null
   );
   const [selectedCarrier, setSelectedCarrier] = useState<ICarrier | null>(
      null
   );
   const [selectedCards, setSelectedCards] = useState<ICard[]>([]);
   const { data: cart } = getCart(customer?.id || 0);
   const finalValue = cart?.bookToCart.reduce((acc, bookToCart) => {
      const stockMovements = bookToCart.book.stock?.stockMovement || [];

      if (stockMovements.length === 0) return acc;

      const bookValue = getBookValueNumber(bookToCart.book, bookToCart.amount);

      return acc + bookValue;
   }, 0);

   useEffect(() => {
      const fetchCarriers = async () => {
         const data = await getCarriers();

         if (data) {
            setCarriers(data);
         }
      };
      fetchCarriers();
   }, []);

   useEffect(() => {
      if (customerData?.cards) {
         setSelectedCards(
            customerData?.cards.filter((card) => card.preferential)
         );
      }
   }, [customerData]);

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
         confirmationModal({
            title: "Deseja finalizar a compra?",
            message: "Você será redirecionado para a página de inicial",
            confirmAction: async () => {
               try {
                  await handleSubmit();
                  router.push("/shop");
                  successModal("Compra finalizada com sucesso");
               } catch (error: any) {
                  return errorModal(error.message);
               }
            },
            confirmButton: "Finalizar",
            cancelButton: "Voltar",
         });
      }
   };

   const handleSubmit = async () => {
      try {
         const freight: Partial<IFreight> = {
            address: selectedAddress as IAddress,
            carrier: selectedCarrier as ICarrier,
         };
         const cardToSale: Partial<ICardToSale> = {
            card: selectedCard as ICard,
         };

         const sale: Partial<ISale> = {
            freight: freight as IFreight,
            totalValue: Number(finalValue) + Number(selectedCarrier?.cost),
            cardToSales: [cardToSale as ICardToSale],
            cart: cart as ICart,
            paymentMethod: "CARTAO",
         };
         await createSale(sale as ISale);
      } catch (error) {
         throw new Error("Erro ao finalizar a compra");
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
                              {customerData?.addresses.map((address) => (
                                 <OptionContainer
                                    key={address.id}
                                    $selected={
                                       selectedAddress?.id === address.id
                                    }
                                    onClick={() => {
                                       setSelectedAddress(address);
                                    }}
                                 >
                                    <Radius
                                       active={
                                          selectedAddress?.id === address.id
                                       }
                                    />
                                    <OptionText>{address.nickname}</OptionText>
                                    <OptionDescription>
                                       {address.street}, {address.number} -{" "}
                                       {address.neighborhood},{" "}
                                       {address.city.name}
                                    </OptionDescription>
                                 </OptionContainer>
                              ))}
                              <PlusOptionContainer>
                                 <IconComponent name="PlusCartIcon" />
                              </PlusOptionContainer>
                           </CardContainer>
                           <CardContainer>
                              Transportadora
                              {carriers.map((carrier) => (
                                 <OptionContainer
                                    key={carrier.id}
                                    onClick={() => setSelectedCarrier(carrier)}
                                    $selected={
                                       selectedCarrier?.id === carrier.id
                                    }
                                 >
                                    <Radius
                                       active={
                                          selectedCarrier?.id === carrier.id
                                       }
                                    />
                                    <OptionText>{carrier.name}</OptionText>
                                    <OptionValue>
                                       R${" "}
                                       {Number(carrier.cost)
                                          .toFixed(2)
                                          .replace(".", ",")}
                                    </OptionValue>
                                 </OptionContainer>
                              ))}
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
                              {customerData?.cards.map((card) => (
                                 <OptionContainer
                                    key={card.id}
                                    $selected={selectedCards.some(
                                       (c) => c.id === card.id
                                    )}
                                    onClick={() => {
                                       if (
                                          selectedCards.some(
                                             (c) => c.id === card.id
                                          )
                                       ) {
                                          setSelectedCards(
                                             selectedCards.filter(
                                                (c) => c.id !== card.id
                                             )
                                          );
                                       } else {
                                          setSelectedCards([
                                             ...selectedCards,
                                             card,
                                          ]);
                                       }
                                    }}
                                 >
                                    <CheckBox
                                       active={selectedCards.some(
                                          (c) => c.id === card.id
                                       )}
                                    />
                                    {card.cardBrand} - {card.number}
                                 </OptionContainer>
                              ))}
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
                              <SumaryItemValue>
                                 {formatValue(finalValue || 0)}
                              </SumaryItemValue>
                           </SumaryItem>
                           <SumaryItem>
                              <SumaryItemLabel>Descontos</SumaryItemLabel>
                              <SumaryItemValue>-----</SumaryItemValue>
                           </SumaryItem>
                           <SumaryItem>
                              <SumaryItemLabel>Frete</SumaryItemLabel>
                              <SumaryItemValue>
                                 {selectedCarrier?.cost
                                    ? formatValue(Number(selectedCarrier?.cost))
                                    : "-----"}
                              </SumaryItemValue>
                           </SumaryItem>
                           <SumaryItem>
                              <SumaryItemLabel>Total</SumaryItemLabel>
                              <SumaryItemTotal>
                                 {formatValue(finalValue || 0)}
                              </SumaryItemTotal>
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
                        {cart?.bookToCart.map((bookToCart) => (
                           <ResumeContent key={bookToCart.book.id}>
                              <BookContainer>
                                 <p>{bookToCart.amount}x</p>
                                 <ImageContainer>
                                    <Image
                                       src={`/books/${bookToCart.book.slug}.jpg`}
                                       alt={`Imagem do livro`}
                                       width={100}
                                       height={100}
                                       style={{ objectFit: "contain" }}
                                    />
                                 </ImageContainer>
                                 <p>{bookToCart.book.title}</p>
                              </BookContainer>
                              <p>
                                 R${" "}
                                 {getBookValue(
                                    bookToCart.book,
                                    bookToCart.amount
                                 )}
                              </p>
                           </ResumeContent>
                        ))}
                     </ResumeSection>
                     <ResumeSection>
                        Entrega
                        <ResumeContent>
                           <p>
                              {selectedAddress?.nickname} -{" "}
                              {selectedAddress?.street},{" "}
                              {selectedAddress?.number}
                           </p>
                           <p>
                              R${" "}
                              {Number(selectedCarrier?.cost)
                                 .toFixed(2)
                                 .replace(".", ",")}
                           </p>
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
                           <CreditCardsContainer>
                              {selectedCards.map((card, index) => (
                                 <p>
                                    {index + 1} - {card?.cardBrand} -{" "}
                                    {card?.number}
                                 </p>
                              ))}
                           </CreditCardsContainer>
                        </ResumeContent>
                     </ResumeSection>
                     <TotalValueContainer>
                        <p>Valor total</p>
                        <p>
                           {formatValue(
                              Number(finalValue) + Number(selectedCarrier?.cost)
                           )}
                        </p>
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
