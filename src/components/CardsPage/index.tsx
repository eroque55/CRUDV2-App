import { StyledPage } from "@/src/app/admin/customer/[id]/page.styles";
import CardCard from "../CardCard";

import { Card } from "@/src/interfaces/api";

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
