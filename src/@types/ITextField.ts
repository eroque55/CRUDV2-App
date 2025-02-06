interface ITextField {
   children: React.ReactNode;
   value?: string;
   placeholder: string;
   type?: string;
   required?: boolean;
   maxLength?: number;
}

export default ITextField;
