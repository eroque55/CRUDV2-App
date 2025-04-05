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
import IBook from "@/src/interfaces/IBook";
import IconComponent from "../Icon";

interface Props {
   book: IBook;
}

const CartItem = ({ book }: Props) => {
   return (
      <Container>
         <ImageContainer>
            <Image
               src={`/books/${book.slug}.jpg`}
               alt={`Imagem do livro ${book.title}`}
               width={168}
               height={168}
               style={{
                  objectFit: "contain",
               }}
            />
         </ImageContainer>
         <ContentContainer>
            <BookTitle>{book.title}</BookTitle>
            <BookAuthor>{book.author}</BookAuthor>
         </ContentContainer>
         <ValueContainer>
            <BookQtdContainer>
               <IconComponent name="MinusCartIcon" size={20} />
               {book.stock.amount}
               <IconComponent name="PlusCartIcon" size={20} />
            </BookQtdContainer>
            <Value>R$ 59,90</Value>
         </ValueContainer>
      </Container>
   );
};

export default CartItem;
