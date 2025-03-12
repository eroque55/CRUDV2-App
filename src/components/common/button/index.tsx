import { StyledButton } from "./index.styles";

interface Props {
   children: React.ReactNode;
   wired?: boolean;
   onClick: () => void;
}

export function DefaultButton({ children, wired, onClick }: Props) {
   return (
      <StyledButton $wired={wired} onClick={onClick}>
         {children}
      </StyledButton>
   );
}
