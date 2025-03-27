import { useState } from "react";
import IconComponent from "../Icon";
import { PasswordContainer, PasswordInput } from "./styles";

interface Props {
   id: string;
   placeholder?: string;
   register: any;
}

const InputPassword = ({ id, placeholder, register }: Props) => {
   const [type, setType] = useState<"password" | "text">("password");

   const toggleType = () => {
      setType(type === "password" ? "text" : "password");
   };

   return (
      <PasswordContainer>
         <PasswordInput
            type={type}
            id={id}
            placeholder={placeholder}
            {...register(id)}
         />
         <IconComponent
            name={type === "password" ? "PasswordGrayIcon" : "PasswordBlueIcon"}
            width={20}
            onClick={toggleType}
         />
      </PasswordContainer>
   );
};

export default InputPassword;
