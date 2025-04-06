import Image from "next/image";
import {
   BookAuthor,
   BookQtdContainer,
   BookTitle,
   Container,
   ContentContainer,
   ImageContainer,
   Value,
   ValueContainer,
} from "./styles";
import IconComponent from "../Icon";
import IBookToCart from "@/src/interfaces/IBookToCart";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ICart from "@/src/interfaces/ICart";
import { successModal } from "@/src/utils/Toasts";

interface Props {
   setCart: Dispatch<SetStateAction<ICart | null>>;
   bookToCart: IBookToCart;
   cart: ICart;
   setIsUpdating: (value: boolean) => void;
}

const CartItem = ({ bookToCart, setCart, cart, setIsUpdating }: Props) => {
   const [qtd, setQtd] = useState(bookToCart.amount);

   useEffect(() => {
      const timeout = setTimeout(() => {
         const updatedBookToCart = {
            ...bookToCart,
            amount: qtd,
         };

         const updatedCart: ICart = {
            ...cart,
            bookToCart: cart.bookToCart.map((item) =>
               item.book.id === bookToCart.book.id ? updatedBookToCart : item
            ),
         };

         setCart(updatedCart);
         setIsUpdating(true);
      }, 300);

      return () => clearTimeout(timeout);
   }, [qtd]);

   const handleMinusClick = () => {
      if (qtd > 1) {
         setQtd(qtd - 1);
      } else if (qtd === 1) {
         setQtd(0);
         successModal("Livro removido do carrinho com sucesso");
      }
   };

   const handlePlusClick = () => {
      setQtd(qtd + 1);
   };

   if (qtd === 0) {
      return null;
   }

   return (
      <Container>
         <ImageContainer>
            <Image
               src={`/books/${bookToCart.book.slug}.jpg`}
               alt={`Imagem do livro ${bookToCart.book.title}`}
               width={168}
               height={168}
               style={{ objectFit: "contain" }}
            />
         </ImageContainer>
         <ContentContainer>
            <BookTitle>{bookToCart.book.title}</BookTitle>
            <BookAuthor>{bookToCart.book.author}</BookAuthor>
         </ContentContainer>
         <ValueContainer>
            <BookQtdContainer>
               <IconComponent
                  name="MinusCartIcon"
                  size={20}
                  onClick={handleMinusClick}
               />
               {qtd}
               <IconComponent
                  name="PlusCartIcon"
                  size={20}
                  onClick={handlePlusClick}
               />
            </BookQtdContainer>
            <Value>R$ 59,90</Value>
         </ValueContainer>
      </Container>
   );
};

export default CartItem;
