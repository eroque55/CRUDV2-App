import { PersonalData } from "./elements";
import { formatPhone, formatCpf } from "../../../src/util";

class EditCustomer {
   verifyPersonalData(customerPersonalData: any) {
      cy.get(PersonalData.name).should("have.value", customerPersonalData.name);
      cy.get(PersonalData.birthDate).should(
         "have.value",
         customerPersonalData.birthDate.split("T")[0]
      );
      cy.get(PersonalData.cpf).should(
         "have.value",
         formatCpf(customerPersonalData.cpf)
      );
      cy.get(PersonalData.gender).should(
         "have.value",
         customerPersonalData.gender
      );
      cy.get(PersonalData.email).should(
         "have.value",
         customerPersonalData.email
      );
      cy.get(PersonalData.ranking).should(
         "have.value",
         customerPersonalData.ranking
      );
      cy.get(PersonalData.phone).should(
         "have.value",
         formatPhone(
            customerPersonalData.phones[0].ddd +
               customerPersonalData.phones[0].number
         )
      );
      cy.get(PersonalData.phoneType).should(
         "have.value",
         customerPersonalData.phones[0].phoneType
      );
   }

   submitPersonalData(customer: any) {
      cy.get(PersonalData.name).clear().type(customer.name);
      cy.get(PersonalData.birthDate)
         .clear()
         .type(customer.birthDate.split("T")[0]);
      cy.get(PersonalData.cpf).clear().type(customer.cpf);
      cy.get(PersonalData.gender).select(customer.gender);
      cy.get(PersonalData.email).clear().type(customer.email);
      cy.get(PersonalData.ranking).clear().type(customer.ranking);
      cy.get(PersonalData.phone)
         .clear()
         .type(customer.phones[0].ddd + customer.phones[0].number);
      cy.get(PersonalData.phoneType).select(customer.phones[0].phoneType);
      cy.get(PersonalData.saveButton).click();
   }

   // fillBillingAddress(billingAddress: any) {
   //    cy.get(BillingAddress.nickname).clear().type(billingAddress.nickname);
   //    cy.get(BillingAddress.cep).clear().type(billingAddress.cep);
   //    cy.get(BillingAddress.residenceType).select(billingAddress.residenceType);
   //    cy.get(BillingAddress.streetType).select(billingAddress.streetType);
   //    cy.get(BillingAddress.street).clear().type(billingAddress.street);
   //    cy.get(BillingAddress.number)
   //       .clear()
   //       .type(billingAddress.number.toString());
   //    cy.get(BillingAddress.neighborhood)
   //       .clear()
   //       .type(billingAddress.neighborhood);
   //    cy.get(BillingAddress.country).select(
   //       billingAddress.city.state.country.id.toString()
   //    );
   //    cy.get(BillingAddress.state).select(
   //       billingAddress.city.state.id.toString()
   //    );
   //    cy.get(BillingAddress.city).select(billingAddress.city.id.toString());
   //    {
   //       billingAddress.complement &&
   //          cy.get(DeliveryAddress.complement).type(billingAddress.complement);
   //    }
   //    cy.get(BillingAddress.nextButton).click();
   // }

   // fillDeliveryAddress(deliveryAddress: any) {
   //    cy.get(DeliveryAddress.nickname).clear().type(deliveryAddress.nickname);
   //    cy.get(DeliveryAddress.cep).clear().type(deliveryAddress.cep);
   //    cy.get(DeliveryAddress.residenceType).select(
   //       deliveryAddress.residenceType
   //    );
   //    cy.get(DeliveryAddress.streetType).select(deliveryAddress.streetType);
   //    cy.get(DeliveryAddress.street).clear().type(deliveryAddress.street);
   //    cy.get(DeliveryAddress.number)
   //       .clear()
   //       .type(deliveryAddress.number.toString());
   //    cy.get(DeliveryAddress.neighborhood)
   //       .clear()
   //       .type(deliveryAddress.neighborhood);
   //    cy.get(DeliveryAddress.country).select(
   //       deliveryAddress.city.state.country.id.toString()
   //    );
   //    cy.get(DeliveryAddress.state).select(
   //       deliveryAddress.city.state.id.toString()
   //    );
   //    cy.get(DeliveryAddress.city).select(deliveryAddress.city.id.toString());
   //    {
   //       deliveryAddress.complement &&
   //          cy.get(DeliveryAddress.complement).type(deliveryAddress.complement);
   //    }
   //    cy.get(DeliveryAddress.nextButton).click();
   // }

   // validatePersonalData() {
   //    cy.contains("Nome é obrigatório").should("be.visible");
   //    cy.contains("Data de nascimento inválida").should("be.visible");
   //    cy.contains("CPF é obrigatório").should("be.visible");
   //    cy.contains("E-mail é obrigatório").should("be.visible");
   //    cy.contains("Senha é obrigatória").should("be.visible");
   //    cy.contains("Confirmação de senha é obrigatória").should("be.visible");
   //    cy.contains("Número de telefone é obrigatório").should("be.visible");
   // }

   //    validateAddress() {
   //       cy.contains("Apelido é obrigatório").should("be.visible");
   //       cy.contains("CEP é obrigatório").should("be.visible");
   //       cy.contains("Logradouro é obrigatório").should("be.visible");
   //       cy.contains("Número inválido").should("be.visible");
   //       cy.contains("Bairro é obrigatório").should("be.visible");
   //    }
}

export default new EditCustomer();
