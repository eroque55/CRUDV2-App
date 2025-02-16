import { StyledPage } from "@/src/app/customer/[id]/page.styles";
import CardCard from "./CardCard";

import { Card } from "@/src/@types/api";

interface Props {
   customerId: number;
   cards: Card[];
}

export default function CardsPage({ cards, customerId }: Props) {
   return (
      <StyledPage>
         {cards.map((card) => (
            <CardCard customerId={customerId} key={card.id} card={card} />
         ))}
      </StyledPage>
   );
}
