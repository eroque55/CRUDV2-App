import { StyledPage } from "@/src/app/customer/[id]/page.styles";
import CardCard from "./CardCard";
import ICard from "@/src/@types/ICard";

interface Props {
   cards: ICard[];
}

export default function CardsPage({ cards }: Props) {
   return (
      <StyledPage>
         {cards.map((card) => (
            <CardCard key={card._id} card={card} />
         ))}
      </StyledPage>
   );
}
