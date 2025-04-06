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
import { useRouter } from "next/navigation";
import { getBookValue } from "@/src/utils";

interface Props {
   book: IBook;
}

const Product = ({ book }: Props) => {
   const router = useRouter();
   return (
      <ProductContainer onClick={() => router.push(`shop/book/${book.slug}`)}>
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
            <StrongDescription>R$ {getBookValue(book)}</StrongDescription>
         </DescriptionContainer>
      </ProductContainer>
   );
};

export default Product;
