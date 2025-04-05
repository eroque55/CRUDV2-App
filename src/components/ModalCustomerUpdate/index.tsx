import ModalBackground from "../ModalBackground";
import { ModalContainer } from "../Modal/styles";
import ModalHeader from "../ModalHeader";
import ModalFooter from "../ModalFooter";
import ModalForm from "../ModalForm";
import InputField from "../InputField";
import { useForm } from "react-hook-form";
import {
   CustomerSchema,
   ICustomerSchema,
} from "@/src/validations/CustomerCreateSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
   confirmationModal,
   errorModal,
   IConfirmationToast,
   successModal,
} from "@/src/utils/Toasts";
import IPhone from "@/src/interfaces/IPhone";
import ICustomer from "@/src/interfaces/ICustomer";
import { getCustomer, updateCustomer } from "@/src/services/Customer.service";
import { updatePhone } from "@/src/services/Phone.service";
import { useParams } from "next/navigation";

interface Props {
   isOpen: boolean;
   setIsOpen: (value: boolean) => void;
}

const ModalCustomerUpdate = ({ isOpen, setIsOpen }: Props) => {
   const params = useParams();
   const { data: customer, refetch } = getCustomer(Number(params.id));

   const phone = String(customer?.phone.ddd + (customer?.phone.number || ""));

   const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
   } = useForm<ICustomerSchema>({
      resolver: yupResolver(CustomerSchema),
      mode: "onBlur",
      defaultValues: {
         password: "thisIsAEmptyPassword1@",
         confPassword: "thisIsAEmptyPassword1@",
         cpf: customer?.cpf,
         number: phone,
      },
   });

   const confModal: IConfirmationToast = {
      title: "Cancelar alterações?",
      message: "Deseja realmente cancelar as alterações?",
      confirmButton: "Cancelar",
      cancelButton: "Voltar",
      confirmAction: () => {
         setIsOpen(false);
         reset();
      },
   };

   const onCancel = () => {
      confirmationModal(confModal);
   };

   const onSubmit = async (data: ICustomerSchema) => {
      try {
         const updatedPhone: Partial<IPhone> = {
            id: customer?.phone.id,
            ddd: data.number.substring(0, 2),
            number: data.number.substring(2),
            phoneType: data.phoneType as
               | "RESIDENCIAL"
               | "CELULAR"
               | "COMERCIAL",
         };

         const updatedCustomer: Partial<ICustomer> = {
            id: customer?.id,
            name: data.name,
            birthDate: data.birthDate,
            cpf: data.cpf,
            gender: data.gender as "MASCULINO" | "FEMININO" | "OUTRO",
            email: data.email,
            ranking: data.ranking,
         };
         await updateCustomer(updatedCustomer.id || 0, updatedCustomer);
         await updatePhone(updatedPhone.id || 0, updatedPhone);
         successModal("Cliente atualizado com sucesso");

         if (!customer?.id) {
            throw new Error("Cliente não encontrado");
         }

         await refetch();
         setIsOpen(false);
      } catch (error: any) {
         errorModal(error.response.data);
      }
   };

   if (!isOpen) return null;

   return (
      <ModalBackground>
         <ModalContainer $width="40rem">
            <ModalHeader>Alterar dados pessoais</ModalHeader>
            <ModalForm>
               <InputField
                  id="name"
                  label="Nome"
                  register={register}
                  placeholder="Insira o nome"
                  error={errors.name?.message}
                  defaultValue={customer?.name}
               />
               <InputField
                  id="birthDate"
                  label="Data de nascimento"
                  register={register}
                  error={errors.birthDate?.message}
                  inputType="date"
                  defaultValue={customer?.birthDate.toString().split("T")[0]}
               />
               <InputField
                  id="cpf"
                  label="CPF"
                  register={register}
                  placeholder="Insira o CPF"
                  error={errors.cpf?.message}
                  defaultValue={customer?.cpf}
                  type="maskedInput"
                  mask="000.000.000-00"
                  onAccept={(value) => {
                     setValue("cpf", value.replace(/[-.]/g, ""));
                  }}
               />
               <InputField
                  id="gender"
                  label="Gênero"
                  type="select"
                  register={register}
                  selectOptions={[
                     { value: "MASCULINO", label: "Masculino" },
                     { value: "FEMININO", label: "Feminino" },
                     { value: "OUTRO", label: "Outro" },
                  ]}
                  error={errors.gender?.message}
                  defaultValue={customer?.gender}
               />
               <InputField
                  id="email"
                  label="E-mail"
                  register={register}
                  placeholder="Insira o e-mail"
                  error={errors.email?.message}
                  defaultValue={customer?.email}
               />
               <InputField
                  id="ranking"
                  label="Ranking"
                  inputType="number"
                  register={register}
                  placeholder="Insira o ranking"
                  error={errors.ranking?.message}
                  defaultValue={String(customer?.ranking)}
               />
               <InputField
                  id="number"
                  label="Número do telefone"
                  register={register}
                  placeholder="Insira o número do telefone"
                  error={errors.number?.message}
                  defaultValue={phone}
                  type="maskedInput"
                  mask="(00) 00000-0000"
                  onAccept={(value) => {
                     setValue("number", value.replace(/[()-/ ]/g, ""));
                  }}
               />
               <InputField
                  id="phoneType"
                  label="Tipo de telefone"
                  type="select"
                  selectOptions={[
                     {
                        value: "RESIDENCIAL",
                        label: "Residencial",
                     },
                     {
                        value: "CELULAR",
                        label: "Celular",
                     },
                     {
                        value: "COMERCIAL",
                        label: "Comercial",
                     },
                  ]}
                  register={register}
                  error={errors.phoneType?.message}
                  defaultValue={customer?.phone.phoneType}
               />
            </ModalForm>
            <ModalFooter
               confirmButtonType="submit"
               cancelButton="Cancelar"
               confirmAction={handleSubmit(onSubmit)}
               cancelAction={onCancel}
            >
               Alterar
            </ModalFooter>
         </ModalContainer>
      </ModalBackground>
   );
};

export default ModalCustomerUpdate;
