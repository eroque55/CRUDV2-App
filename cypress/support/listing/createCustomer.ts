import { BillingAddress, DeliveryAddress, PersonalData } from "./elements";

class CreateCustomer {
   fillAllData(customer: any) {
      this.fillPersonalData(customer);
      this.fillDeliveryAddress(customer.addresses[0]);
      this.fillBillingAddress(customer.addresses[1]);
   }

   fillPersonalData(customerPersonalData: any) {
      cy.get(PersonalData.name).clear().type(customerPersonalData.name);
      cy.get(PersonalData.birthDate)
         .clear()
         .type(customerPersonalData.birthDate.toString().slice(0, 10));
      cy.get(PersonalData.cpf).clear().type(customerPersonalData.cpf);
      cy.get(PersonalData.gender).select(customerPersonalData.gender);
      cy.get(PersonalData.email).clear().type(customerPersonalData.email);
      cy.get(PersonalData.password).clear().type(customerPersonalData.password);
      cy.get(PersonalData.confPassword)
         .clear()
         .type(customerPersonalData.confPassword);
      cy.get(PersonalData.ranking).clear().type(customerPersonalData.ranking);
      cy.get(PersonalData.phone)
         .clear()
         .type(
            customerPersonalData.phone.ddd + customerPersonalData.phone.number
         );
      cy.get(PersonalData.phoneType).select(
         customerPersonalData.phone.phoneType
      );
      cy.get(PersonalData.nextButton).click();
   }

   fillBillingAddress(billingAddress: any) {
      cy.get(BillingAddress.nickname).clear().type(billingAddress.nickname);
      cy.get(BillingAddress.cep).clear().type(billingAddress.cep);
      cy.get(BillingAddress.residenceType).select(billingAddress.residenceType);
      cy.get(BillingAddress.streetType).select(billingAddress.streetType);
      cy.get(BillingAddress.street).clear().type(billingAddress.street);
      cy.get(BillingAddress.number)
         .clear()
         .type(billingAddress.number.toString());
      cy.get(BillingAddress.neighborhood)
         .clear()
         .type(billingAddress.neighborhood);
      cy.get(BillingAddress.country).select(
         billingAddress.city.state.country.id.toString()
      );
      cy.get(BillingAddress.state).select(
         billingAddress.city.state.id.toString()
      );
      cy.get(BillingAddress.city).select(billingAddress.city.id.toString());
      {
         billingAddress.complement &&
            cy.get(DeliveryAddress.complement).type(billingAddress.complement);
      }
      cy.get(BillingAddress.nextButton).click();
   }

   fillDeliveryAddress(deliveryAddress: any) {
      cy.get(DeliveryAddress.nickname).clear().type(deliveryAddress.nickname);
      cy.get(DeliveryAddress.cep).clear().type(deliveryAddress.cep);
      cy.get(DeliveryAddress.residenceType).select(
         deliveryAddress.residenceType
      );
      cy.get(DeliveryAddress.streetType).select(deliveryAddress.streetType);
      cy.get(DeliveryAddress.street).clear().type(deliveryAddress.street);
      cy.get(DeliveryAddress.number)
         .clear()
         .type(deliveryAddress.number.toString());
      cy.get(DeliveryAddress.neighborhood)
         .clear()
         .type(deliveryAddress.neighborhood);
      cy.get(DeliveryAddress.country).select(
         deliveryAddress.city.state.country.id.toString()
      );
      cy.get(DeliveryAddress.state).select(
         deliveryAddress.city.state.id.toString()
      );
      cy.get(DeliveryAddress.city).select(deliveryAddress.city.id.toString());
      {
         deliveryAddress.complement &&
            cy.get(DeliveryAddress.complement).type(deliveryAddress.complement);
      }
      cy.get(DeliveryAddress.nextButton).click();
   }

   validatePersonalData() {
      cy.contains("Nome é obrigatório").should("be.visible");
      cy.contains("Data de nascimento inválida").should("be.visible");
      cy.contains("CPF é obrigatório").should("be.visible");
      cy.contains("E-mail é obrigatório").should("be.visible");
      cy.contains("Senha é obrigatória").should("be.visible");
      cy.contains("Confirmação de senha é obrigatória").should("be.visible");
      cy.contains("Número de telefone é obrigatório").should("be.visible");
   }

   validateAddress() {
      cy.contains("Apelido é obrigatório").should("be.visible");
      cy.contains("CEP é obrigatório").should("be.visible");
      cy.contains("Logradouro é obrigatório").should("be.visible");
      cy.contains("Número inválido").should("be.visible");
      cy.contains("Bairro é obrigatório").should("be.visible");
   }
}

export default new CreateCustomer();
