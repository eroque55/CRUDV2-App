import {
   PersonalData,
   CreateAddress,
   UpdateAddress,
   CreateCard,
} from "./elements";
import { formatPhone, formatCpf, formatCep } from "../../../src/util";

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
            customerPersonalData.phone.ddd + customerPersonalData.phone.number
         )
      );
      cy.get(PersonalData.phoneType).should(
         "have.value",
         customerPersonalData.phone.phoneType
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

   submitAddress(address: any) {
      cy.get(CreateAddress.nickname).type(address.nickname);
      cy.get(CreateAddress.cep).type(address.cep);
      cy.get(CreateAddress.addressType).select(address.addressType);
      cy.get(CreateAddress.residenceType).select(address.residenceType);
      cy.get(CreateAddress.streetType).select(address.streetType);
      cy.get(CreateAddress.street).type(address.street);
      cy.get(CreateAddress.number).type(address.number.toString());
      cy.get(CreateAddress.neighborhood).type(address.neighborhood);
      cy.get(CreateAddress.country).select(
         address.city.state.country.id.toString()
      );
      cy.get(CreateAddress.state).select(address.city.state.id.toString());
      cy.get(CreateAddress.city).select(address.city.id.toString());
      {
         address.complement &&
            cy.get(CreateAddress.complement).type(address.complement);
      }
      cy.get(CreateAddress.saveButton).click();
   }

   verifyAddress(address: any) {
      cy.get(UpdateAddress.nickname).should("have.value", address.nickname);
      cy.get(UpdateAddress.cep).should("have.value", formatCep(address.cep));
      cy.get(UpdateAddress.residenceType).should(
         "have.value",
         address.residenceType
      );
      cy.get(UpdateAddress.streetType).should("have.value", address.streetType);
      cy.get(UpdateAddress.street).should("have.value", address.street);
      cy.get(UpdateAddress.number).should(
         "have.value",
         address.number.toString()
      );
      cy.get(UpdateAddress.neighborhood).should(
         "have.value",
         address.neighborhood
      );
      cy.get(UpdateAddress.country).should(
         "have.value",
         address.city.state.country.id.toString()
      );
      cy.get(UpdateAddress.state).should(
         "have.value",
         address.city.state.id.toString()
      );
      cy.get(UpdateAddress.city).should(
         "have.value",
         address.city.id.toString()
      );
      {
         address.complement &&
            cy
               .get(UpdateAddress.complement)
               .should("have.value", address.complement);
      }
   }

   updateAddress(address: any) {
      cy.get(UpdateAddress.nickname).clear().type(address.nickname);
      cy.get(UpdateAddress.cep).clear().type(address.cep);
      cy.get(UpdateAddress.residenceType).select(address.residenceType);
      cy.get(UpdateAddress.streetType).select(address.streetType);
      cy.get(UpdateAddress.street).clear().type(address.street);
      cy.get(UpdateAddress.number).clear().type(address.number.toString());
      cy.get(UpdateAddress.neighborhood).clear().type(address.neighborhood);
      cy.get(UpdateAddress.country).select(
         address.city.state.country.id.toString()
      );
      cy.get(UpdateAddress.state).select(address.city.state.id.toString());
      cy.get(UpdateAddress.city).select(address.city.id.toString());
      cy.get(UpdateAddress.complement).clear().type(address.complement);

      cy.get(UpdateAddress.saveButton).click();
   }

   submitCard(card: any) {
      cy.get(CreateCard.number).type(card.number);
      cy.get(CreateCard.expirationDate).type(card.expirationDate);
      cy.get(CreateCard.cardHolder).type(card.cardHolder);
      cy.get(CreateCard.cvv).type(card.cvv);
      cy.get(CreateCard.cardBrand).type(card.cardBrand);

      cy.get(CreateCard.saveButton).click();
   }
}

export default new EditCustomer();
