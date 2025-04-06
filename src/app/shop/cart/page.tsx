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
import { getCart, updateCart } from "@/src/services/Cart.service";
import useAuthStore from "@/src/store/CustomerShopStore";
import { useEffect, useState } from "react";
import ICart from "@/src/interfaces/ICart";

const CartPage = () => {
   const router = useRouter();
   const { customer } = useAuthStore();
   const { data, isLoading } = getCart(customer?.id || 0);
   const [cart, setCart] = useState<ICart | null>(null);
   const [isUpdating, setIsUpdating] = useState(false);

   useEffect(() => {
      if (data) {
         setCart(data);
      }
   }, [data]);

   const handleUpdateCart = async () => {
      if (!cart) return;

      const payload: Partial<ICart> = {
         id: cart.id,
         bookToCart: cart.bookToCart,
      };

      await updateCart(payload as ICart);
   };

   useEffect(() => {
      if (isUpdating) {
         handleUpdateCart();
         setIsUpdating(false);
      }
   }, [isUpdating]);

   const totalValue =
      cart?.bookToCart.reduce((acc, bookToCart) => {
         const stockMovements = bookToCart.book.stock?.stockMovement || [];

         if (stockMovements.length === 0) return acc;

         const maxCost = stockMovements.reduce((max, current) =>
            Number(current.cost) > Number(max.cost) ? current : max
         ).cost;

         const tax = Number(bookToCart.book.priceGroup?.tax || 0);
         const unitValue = Number(maxCost) + tax;
         const totalCost = unitValue * bookToCart.amount;

         return acc + totalCost;
      }, 0) ?? 0;

   if (isLoading) return <Loader />;

   if (!cart) return <div>Carrinho não encontrado</div>;

   return (
      <Container>
         <CartContainer>
            {cart.bookToCart.map((bookToCart) => (
               <CartItem
                  key={bookToCart.book.id}
                  bookToCart={bookToCart}
                  cart={cart}
                  setCart={setCart}
                  setIsUpdating={setIsUpdating}
               />
            ))}
         </CartContainer>
         <SumaryContainer>
            <SumaryHeader>
               <SumaryTitle>Carrinho</SumaryTitle>
               <SumaryContent>
                  <SumaryItem>
                     <SumaryItemLabel>Subtotal</SumaryItemLabel>
                     <SumaryItemValue>
                        R$ {totalValue.toFixed(2).replace(".", ",")}
                     </SumaryItemValue>
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
                     <SumaryItemTotal>
                        R$ {totalValue.toFixed(2).replace(".", ",")}
                     </SumaryItemTotal>
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
