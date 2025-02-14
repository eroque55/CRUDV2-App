import { StyledPage } from "@/src/app/customer/[id]/page.styles";
import CardCard from "./CardCard";
import ICard from "@/src/@types/ICard";

interface Props {
   cards: ICard[];
   fetchData: () => void;
}

export default function CardsPage({ cards, fetchData }: Props) {
   return (
      <StyledPage>
         {cards.map((card) => (
            <CardCard fetchData={fetchData} key={card._id} card={card} />
         ))}
      </StyledPage>
   );
}
