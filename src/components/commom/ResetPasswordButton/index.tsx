import { StyledResetPasswordButton } from "./index.styles";
import Image from "next/image";
import PasswordIcon from "@/public/icons/ResetPassowrdIcon.svg";

export default function ResetPasswordButton({
   onClick,
}: {
   onClick: () => void;
}) {
   return (
      <StyledResetPasswordButton onClick={onClick}>
         <Image src={PasswordIcon} width={16} height={16} alt="Icone de mais" />
         Alterar senha
      </StyledResetPasswordButton>
   );
}
