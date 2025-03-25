import { StyledSwitch } from "./index.styles";

interface Props {
   status: boolean;
   onToggle: () => void;
}

export default function Switch({ status, onToggle }: Props) {
   return (
      <StyledSwitch
         onClick={(e) => {
            e.stopPropagation();
            onToggle();
         }}
         $active={status}
      />
   );
}
