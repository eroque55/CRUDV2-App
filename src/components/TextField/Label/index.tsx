import { StyledLabel } from "./index.styles";

interface Props {
   children: React.ReactNode;
}

export default function Label({ children }: Props) {
   return <StyledLabel>{children}</StyledLabel>;
}
