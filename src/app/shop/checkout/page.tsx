'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { LogoFullBlackImg } from '@/public';
import ButtonComponent from '@/src/components/Button';
import { useRouter } from 'next/navigation';
import {
  confirmationModal,
  errorModal,
  successModal,
} from '@/src/utils/Toasts';
import IconComponent from '@/src/components/Icon';
import useAuthStore from '@/src/store/CustomerShopStore';
import { getCustomer } from '@/src/services/Customer.service';
import { getCarriers } from '@/src/services/Carriers.service';
import ICarrier from '@/src/interfaces/ICarrier';
import IAddress from '@/src/interfaces/IAddress';
import ICard from '@/src/interfaces/ICard';
import { getCart } from '@/src/services/Cart.service';
import { formatCurrency } from '@/src/utils';
import IFreight from '@/src/interfaces/IFreight';
import ISale from '@/src/interfaces/ISale';
import ICardToSale from '@/src/interfaces/ICardToSale';
import ICart from '@/src/interfaces/ICart';
import { createSale } from '@/src/services/Sale.service';
import Radius from '@/src/components/Radius';
import CheckBox from '@/src/components/CheckBox';
import ModalCheckoutAddressCreate from '@/src/components/ModalCheckoutAddressCreate';
import ModalCheckoutCardCreate from '@/src/components/ModalCheckoutCardCreate';
import { useCountries } from '@/src/store/CountryStore';
import { getCoupon } from '@/src/services/Coupon.service';
import ICoupon from '@/src/interfaces/ICoupon';
import {
  ButtonsContainer,
  SumaryContainer,
  SumaryContent,
  SumaryHeader,
  SumaryItem,
  SumaryItemLabel,
  SumaryItemTotal,
  SumaryItemValue,
  SumaryTitle,
} from '../cart/styles';
import {
  Container,
  HeaderContainer,
  ContentContainer,
  Step,
  StepContainer,
  StepBall,
  StepBallContainer,
  MainContainer,
  CardsContainer,
  CardContainer,
  OptionContainer,
  OptionDescription,
  OptionValue,
  ResumeButtonsContainer,
  ResumeContainer,
  ResumeSection,
  ResumeContent,
  TotalValueContainer,
  ImageContainer,
  BookContainer,
  PlusOptionContainer,
  CoupomContainer,
  CoupomInput,
  OptionText,
  CreditCardsContainer,
} from './styles';

const CheckoutPage = () => {
  const { customer } = useAuthStore();
  const { data: customerData } = getCustomer(customer?.id || 0);
  const [carriers, setCarriers] = useState<ICarrier[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [selectedCarrier, setSelectedCarrier] = useState<ICarrier | null>(null);
  const [selectedCards, setSelectedCards] = useState<ICard[]>([]);
  const [createAddressIsOpen, setCreateAddressIsOpen] = useState(false);
  const [createCardIsOpen, setCreateCardIsOpen] = useState(false);
  const { data: cart } = getCart(customer?.id || 0);
  const { fetchCountries } = useCountries();
  const [couponName, setCouponName] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const finalValue = cart?.bookToCart.reduce((acc, bookToCart) => {
    const stockMovements = bookToCart.book.stock?.stockMovement || [];

    if (stockMovements.length === 0) {
      return acc;
    }

    const bookValue = bookToCart.book.value * bookToCart.amount;

    return acc + bookValue;
  }, 0);

  useEffect(() => {
    const fetchCarriers = async () => {
      const data = await getCarriers();

      if (data) {
        setCarriers(data);
      }
    };
    fetchCarriers();
  }, []);

  useEffect(() => {
    if (customerData?.cards) {
      setSelectedCards(customerData?.cards.filter(card => card.preferential));
    }
  }, [customerData]);

  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
    if (step === 0) {
      confirmationModal({
        title: 'Deseja cancelar a compra?',
        message: 'Você será redirecionado para a página de carrinho',
        confirmAction: () => router.push('/shop/cart'),
        confirmButton: 'Cancelar',
        cancelButton: 'Voltar',
      });
    }
  };

  const handleNext = () => {
    if (step === 0) {
      if (!selectedAddress) {
        return errorModal('Selecione um endereço');
      }
      if (!selectedCarrier) {
        return errorModal('Selecione uma transportadora');
      }
      setStep(1);
    }
    if (step === 1) {
      if (selectedCards.length === 0) {
        return errorModal('Selecione pelo menos um cartão de crédito');
      }
      setStep(2);
    }
    if (step === 2) {
      confirmationModal({
        title: 'Deseja finalizar a compra?',
        message: 'Você será redirecionado para a página de inicial',
        confirmAction: async () => {
          try {
            await handleSubmit();
            router.push('/shop');
            successModal('Compra finalizada com sucesso');
          } catch (error: any) {
            return errorModal(error.message);
          }
        },
        confirmButton: 'Finalizar',
        cancelButton: 'Voltar',
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const freight: Partial<IFreight> = {
        address: selectedAddress as IAddress,
        carrier: selectedCarrier as ICarrier,
      };
      const cardToSales: Partial<ICardToSale>[] = [];

      selectedCards.forEach(card => {
        const cardToSale: Partial<ICardToSale> = {
          card,
        };

        cardToSales.push(cardToSale);
      });

      const paymentMethod = `${selectedCards.length > 1 ? `${selectedCards.length} cartões` : 'Cartão'} de crédito, ${selectedCoupon ? `cupon: ${selectedCoupon.name}` : 'Nenhum cupom utilizado'}`;

      const sale: Partial<ISale> = {
        freight: freight as IFreight,
        totalValue:
          Number(finalValue) +
          Number(selectedCarrier?.cost) -
          Number(selectedCoupon?.discount),
        cardToSales: cardToSales as ICardToSale[],
        cart: cart as ICart,
        paymentMethod,
      };

      await createSale(sale as ISale);
    } catch (error) {
      console.error('Error creating sale:', error);
      throw new Error('Erro ao finalizar a compra');
    }
  };

  const handleSearchCoupon = async () => {
    try {
      if (selectedCoupon) {
        setSelectedCoupon(null);
        setCouponName('');
        return;
      }

      if (!couponName) {
        errorModal('Digite o nome do cupom');
        return;
      }

      const responseCoupon = await getCoupon(couponName);

      if (!responseCoupon) {
        errorModal('Cupom não encontrado');
        return;
      }
      setSelectedCoupon(responseCoupon);
    } catch {
      errorModal('Cupom não encontrado');
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <Image src={LogoFullBlackImg} alt="Logo" />
      </HeaderContainer>
      <ContentContainer>
        <StepContainer>
          <Step $active={step === 0}>
            <StepBallContainer>
              <StepBall $active={step === 0}>{step === 0 && 1}</StepBall>
            </StepBallContainer>
            Entrega
          </Step>
          <Step $active={step === 1}>
            <StepBallContainer>
              <StepBall $active={step === 1}>{step === 1 && 2}</StepBall>
            </StepBallContainer>
            Pagamento
          </Step>
          <Step $active={step === 2}>
            <StepBallContainer>
              <StepBall $active={step === 2}>{step === 2 && 3}</StepBall>
            </StepBallContainer>
            Revisão
          </Step>
        </StepContainer>
        {step !== 2 ? (
          <MainContainer>
            <CardsContainer>
              {step === 0 ? (
                <>
                  {' '}
                  <CardContainer>
                    Endereço de entrega
                    {customerData?.addresses.map(
                      address =>
                        address.addressType === 'ENTREGA' && (
                          <OptionContainer
                            key={address.id}
                            $selected={selectedAddress?.id === address.id}
                            onClick={() => {
                              setSelectedAddress(address);
                            }}
                          >
                            <Radius
                              active={selectedAddress?.id === address.id}
                            />
                            <OptionText>{address.nickname}</OptionText>
                            <OptionDescription>
                              {address.street}, {address.number} -{' '}
                              {address.neighborhood}, {address.city.name}
                            </OptionDescription>
                          </OptionContainer>
                        ),
                    )}
                    <PlusOptionContainer
                      onClick={() => setCreateAddressIsOpen(true)}
                    >
                      <IconComponent name="PlusCartIcon" />
                    </PlusOptionContainer>
                  </CardContainer>
                  <CardContainer>
                    Transportadora
                    {carriers.map(carrier => (
                      <OptionContainer
                        key={carrier.id}
                        onClick={() => setSelectedCarrier(carrier)}
                        $selected={selectedCarrier?.id === carrier.id}
                      >
                        <Radius active={selectedCarrier?.id === carrier.id} />
                        <OptionText>{carrier.name}</OptionText>
                        <OptionValue>
                          R$ {Number(carrier.cost).toFixed(2).replace('.', ',')}
                        </OptionValue>
                      </OptionContainer>
                    ))}
                  </CardContainer>{' '}
                </>
              ) : (
                <>
                  <CardContainer>
                    Cupom
                    <CoupomContainer>
                      <CoupomInput
                        placeholder="Digite seu cupom"
                        onChange={e => setCouponName(e.target.value)}
                        value={selectedCoupon?.name || couponName}
                        disabled={!!selectedCoupon}
                      />
                      <ButtonComponent
                        width="10rem"
                        onClick={handleSearchCoupon}
                      >
                        {selectedCoupon ? 'Remover' : 'Aplicar cupom'}
                      </ButtonComponent>
                    </CoupomContainer>
                  </CardContainer>
                  <CardContainer>
                    Cartao de credito
                    {customerData?.cards.map(card => (
                      <OptionContainer
                        key={card.id}
                        $selected={selectedCards.some(c => c.id === card.id)}
                        onClick={() => {
                          if (selectedCards.some(c => c.id === card.id)) {
                            setSelectedCards(
                              selectedCards.filter(c => c.id !== card.id),
                            );
                          } else {
                            setSelectedCards([...selectedCards, card]);
                          }
                        }}
                      >
                        <CheckBox
                          active={selectedCards.some(c => c.id === card.id)}
                        />
                        {card.cardBrand} - {card.number}
                      </OptionContainer>
                    ))}
                    <PlusOptionContainer
                      onClick={() => setCreateCardIsOpen(true)}
                    >
                      <IconComponent name="PlusCartIcon" />
                    </PlusOptionContainer>
                  </CardContainer>
                </>
              )}
            </CardsContainer>
            <SumaryContainer>
              <SumaryHeader>
                <SumaryTitle>Carrinho</SumaryTitle>
                <SumaryContent>
                  <SumaryItem>
                    <SumaryItemLabel>Subtotal</SumaryItemLabel>
                    <SumaryItemValue>
                      {formatCurrency(finalValue || 0)}
                    </SumaryItemValue>
                  </SumaryItem>
                  <SumaryItem>
                    <SumaryItemLabel>Descontos</SumaryItemLabel>
                    <SumaryItemValue>
                      {selectedCoupon?.discount
                        ? formatCurrency(selectedCoupon.discount)
                        : '-----'}
                    </SumaryItemValue>
                  </SumaryItem>
                  <SumaryItem>
                    <SumaryItemLabel>Frete</SumaryItemLabel>
                    <SumaryItemValue>
                      {selectedCarrier?.cost
                        ? formatCurrency(Number(selectedCarrier?.cost))
                        : '-----'}
                    </SumaryItemValue>
                  </SumaryItem>
                  <SumaryItem>
                    <SumaryItemLabel>Total</SumaryItemLabel>
                    <SumaryItemTotal>
                      {formatCurrency(
                        Number(finalValue) +
                          Number(selectedCarrier?.cost || 0) -
                          Number(selectedCoupon?.discount || 0),
                      )}
                    </SumaryItemTotal>
                  </SumaryItem>
                </SumaryContent>
              </SumaryHeader>
              <ButtonsContainer>
                <ButtonComponent onClick={handleNext}>Proximo</ButtonComponent>
                <ButtonComponent onClick={handleBack} wired>
                  Voltar
                </ButtonComponent>
              </ButtonsContainer>
            </SumaryContainer>
          </MainContainer>
        ) : (
          <>
            <ResumeContainer>
              <ResumeSection>
                Produtos
                {cart?.bookToCart.map(bookToCart => (
                  <ResumeContent key={bookToCart.book.id}>
                    <BookContainer>
                      <p>{bookToCart.amount}x</p>
                      <ImageContainer>
                        <Image
                          src={`/books/${bookToCart.book.slug}.jpg`}
                          alt="Imagem do livro"
                          width={100}
                          height={100}
                          style={{ objectFit: 'contain' }}
                        />
                      </ImageContainer>
                      <p>{bookToCart.book.title}</p>
                    </BookContainer>
                    <p>
                      {formatCurrency(
                        bookToCart.book.value * bookToCart.amount,
                      )}
                    </p>
                  </ResumeContent>
                ))}
              </ResumeSection>
              <ResumeSection>
                Entrega
                <ResumeContent>
                  <p>
                    {selectedAddress?.nickname} - {selectedAddress?.street},{' '}
                    {selectedAddress?.number}
                  </p>
                  <p>
                    R${' '}
                    {Number(selectedCarrier?.cost).toFixed(2).replace('.', ',')}
                  </p>
                </ResumeContent>
              </ResumeSection>
              <ResumeSection>
                Descontos
                <ResumeContent>
                  <p>
                    {selectedCoupon
                      ? selectedCoupon.name
                      : 'Nenhum desconto aplicado'}
                  </p>
                  <p>-{formatCurrency(selectedCoupon?.discount || 0)}</p>
                </ResumeContent>
              </ResumeSection>
              <ResumeSection>
                Pagamento
                <ResumeContent>
                  <CreditCardsContainer>
                    {selectedCards.map((card, index) => (
                      <p key={card.id}>
                        {index + 1} - {card?.cardBrand} - {card?.number}
                      </p>
                    ))}
                  </CreditCardsContainer>
                </ResumeContent>
              </ResumeSection>
              <TotalValueContainer>
                <p>Valor total</p>
                <p>
                  {formatCurrency(
                    Number(finalValue) +
                      Number(selectedCarrier?.cost) -
                      Number(selectedCoupon?.discount || 0),
                  )}
                </p>
              </TotalValueContainer>
            </ResumeContainer>
            <ResumeButtonsContainer>
              <ButtonComponent onClick={handleBack} wired>
                Voltar
              </ButtonComponent>
              <ButtonComponent onClick={handleNext}>Comprar</ButtonComponent>
            </ResumeButtonsContainer>
          </>
        )}
      </ContentContainer>
      <ModalCheckoutAddressCreate
        isOpen={createAddressIsOpen}
        setIsOpen={setCreateAddressIsOpen}
        customerId={customer?.id}
      />
      <ModalCheckoutCardCreate
        isOpen={createCardIsOpen}
        setIsOpen={setCreateCardIsOpen}
        customerId={customer?.id}
      />
    </Container>
  );
};

export default CheckoutPage;
