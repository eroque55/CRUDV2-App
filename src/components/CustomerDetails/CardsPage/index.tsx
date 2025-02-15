import { StyledPage } from "@/src/app/customer/[id]/page.styles";
import CardCard from "./CardCard";
import { useCardStore } from "@/src/store/CardsStore";

export default function CardsPage() {
   const { cards } = useCardStore();

   return (
      <StyledPage>
         {cards.map((card) => (
            <CardCard key={card.id} card={card} />
         ))}
      </StyledPage>
   );
}
