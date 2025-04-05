import Image from "next/image";
import {
   ProductContainer,
   Description,
   DescriptionContainer,
   ImageContainer,
   StrongDescription,
   StyledImage,
} from "./styles";
import IBook from "@/src/interfaces/IBook";

interface Props {
   book: IBook;
}

const Product = ({ book }: Props) => {
   return (
      <ProductContainer>
         <ImageContainer>
            <StyledImage>
               <Image
                  src={`/books/${book.slug}.jpg`}
                  alt={`Imagem do livro ${book.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 50vw,
                     33vw"
                  style={{
                     objectFit: "contain",
                  }}
               />
            </StyledImage>
         </ImageContainer>
         <DescriptionContainer>
            <StrongDescription>{book.title}</StrongDescription>
            <Description>{book.synopsis}</Description>
            <StrongDescription>
               R${" "}
               {parseFloat(book.stock.stockMovement[0].cost.toString())
                  .toFixed(2)
                  .replace(".", ",")}
            </StrongDescription>
         </DescriptionContainer>
      </ProductContainer>
   );
};

export default Product;
