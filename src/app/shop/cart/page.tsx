"use client";

import ButtonComponent from "@/src/components/Button";
import {
   Container,
   ButtonsContainer,
   CartContainer,
   SumaryContainer,
   SumaryContent,
   SumaryHeader,
   SumaryItem,
   SumaryItemLabel,
   SumaryItemTotal,
   SumaryItemValue,
   SumaryTitle,
} from "./styles";
import { useRouter } from "next/navigation";
import CartItem from "@/src/components/CartItem";
import Loader from "@/src/components/Loader";
import { getBook } from "@/src/services/Book.service";

const CartPage = () => {
   const router = useRouter();
   const { data: book, isLoading } = getBook("o-senhor-dos-aneis");

   if (isLoading) return <Loader />;

   if (!book) return <div>Livro não encontrado</div>;
   return (
      <Container>
         <CartContainer>
            <CartItem book={book} />
            <CartItem book={book} />
            <CartItem book={book} />
            <CartItem book={book} />
         </CartContainer>
         <SumaryContainer>
            <SumaryHeader>
               <SumaryTitle>Carrinho</SumaryTitle>
               <SumaryContent>
                  <SumaryItem>
                     <SumaryItemLabel>Subtotal</SumaryItemLabel>
                     <SumaryItemValue>R$ 0,00</SumaryItemValue>
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
                     <SumaryItemTotal>R$ 0,00</SumaryItemTotal>
                  </SumaryItem>
               </SumaryContent>
            </SumaryHeader>
            <ButtonsContainer>
               <ButtonComponent>Finalizar Compra</ButtonComponent>
               <ButtonComponent onClick={() => router.push("/shop")} wired>
                  Continuar Comprando
               </ButtonComponent>
            </ButtonsContainer>
         </SumaryContainer>
      </Container>
   );
};

export default CartPage;
