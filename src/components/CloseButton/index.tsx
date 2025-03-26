import { CloseButtonContainer } from "./styles";
import IconComponent from "../Icon";

interface Props {
   onClick: () => void;
}

export default function CloseButton({ onClick }: Props) {
   return (
      <CloseButtonContainer onClick={onClick}>
         <IconComponent name="CloseIcon" />
      </CloseButtonContainer>
   );
}
