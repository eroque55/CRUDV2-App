import { BackButtonContainer } from "./styles";
import IconComponent from "../Icon";
import { useRouter } from "next/navigation";

interface Props {
   onClick?: () => void;
}

export default function BackButton({ onClick }: Props) {
   const router = useRouter();

   const handleClick = () => {
      onClick ? onClick() : router.back();
   };

   return (
      <BackButtonContainer onClick={handleClick}>
         <IconComponent name="BackIcon" />
      </BackButtonContainer>
   );
}
