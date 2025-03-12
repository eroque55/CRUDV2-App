import Image from "next/image";
import { StyledActionButton } from "./index.styles";

interface Props {
   src: string;
   alt: string;
   onClick: () => void;
}

export default function ActionButtons({ onClick, alt, src }: Props) {
   return (
      <StyledActionButton onClick={onClick}>
         <Image alt={alt} src={src} width={20} height={20} />
      </StyledActionButton>
   );
}
