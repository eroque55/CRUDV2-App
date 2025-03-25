import { ModalBackgroundContainer } from "./styles";

interface Props {
   children: React.ReactNode;
   align?: "center" | "left";
}

const ModalBackground = ({ children, align }: Props) => {
   return (
      <ModalBackgroundContainer $align={align}>
         {children}
      </ModalBackgroundContainer>
   );
};

export default ModalBackground;
