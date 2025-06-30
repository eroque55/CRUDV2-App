'use client';

import ButtonComponent from '@/src/components/Button';
import { useRouter } from 'next/navigation';
import CartItem from '@/src/components/CartItem';
import Loader from '@/src/components/Loader';
import { getCart, updateCart } from '@/src/services/Cart.service';
import useAuthStore from '@/src/store/CustomerShopStore';
import { useEffect, useState } from 'react';
import ICart from '@/src/interfaces/ICart';
import Header from '@/src/components/Header';
import { errorModal } from '@/src/utils/Toasts';
import { formatCurrency } from '@/src/utils';
import {
  Container,
  ButtonsContainer,
  CartContainer,
  SumaryContainer,
  SumaryContent,
  SumaryHeader,
  SumaryItem,
  SumaryItemLabel,
  SumaryItemTotal,
  SumaryItemValue,
  SumaryTitle,
} from './styles';

const CartPage = () => {
  const router = useRouter();
  const { customer } = useAuthStore();
  const { data, isLoading } = getCart(customer?.id || 0);
  const [cart, setCart] = useState<ICart | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [total, setTotal] = useState(cart?.value || 0);

  useEffect(() => {
    if (cart) {
      const cartValue = cart.bookToCart.reduce(
        (acc, bookToCart) =>
          acc + (bookToCart.book.value || 0) * bookToCart.amount,
        0,
      );

      setTotal(cartValue);
    }
  }, [cart]);

  useEffect(() => {
    if (data) {
      setCart(data);
    }
  }, [data]);

  const handleUpdateCart = async () => {
    if (!cart) {
      return;
    }

    const payload: Partial<ICart> = {
      id: cart.id,
      bookToCart: cart.bookToCart,
    };

    await updateCart(payload as ICart);
  };

  useEffect(() => {
    if (isUpdating) {
      handleUpdateCart();
      setIsUpdating(false);
    }
  }, [isUpdating]);

  if (isLoading) {
    return <Loader />;
  }

  const handleSubmit = () => {
    if (!cart) {
      return;
    }
    if (cart.bookToCart.length === 0) {
      return errorModal(
        'Seu carrinho está vazio, adicione livros para continuar.',
      );
    }
    router.push('/shop/checkout');
  };

  if (!cart) {
    return (
      <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        Carrinho não encontrado
      </div>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <CartContainer>
          {cart.bookToCart.map(bookToCart => (
            <CartItem
              key={bookToCart.book.id}
              bookToCart={bookToCart}
              cart={cart}
              setCart={setCart}
              setIsUpdating={setIsUpdating}
            />
          ))}
        </CartContainer>
        <SumaryContainer>
          <SumaryHeader>
            <SumaryTitle>Carrinho</SumaryTitle>
            <SumaryContent>
              <SumaryItem>
                <SumaryItemLabel>Subtotal</SumaryItemLabel>
                <SumaryItemValue>{formatCurrency(total || 0)}</SumaryItemValue>
              </SumaryItem>
              <SumaryItem>
                <SumaryItemLabel>Descontos</SumaryItemLabel>
                <SumaryItemValue>-----</SumaryItemValue>
              </SumaryItem>
              <SumaryItem>
                <SumaryItemLabel>Frete</SumaryItemLabel>
                <SumaryItemValue>-----</SumaryItemValue>
              </SumaryItem>
              <SumaryItem>
                <SumaryItemLabel>Total</SumaryItemLabel>
                <SumaryItemTotal>{formatCurrency(total || 0)}</SumaryItemTotal>
              </SumaryItem>
            </SumaryContent>
          </SumaryHeader>
          <ButtonsContainer>
            <ButtonComponent onClick={handleSubmit}>
              Finalizar Compra
            </ButtonComponent>
            <ButtonComponent onClick={() => router.push('/shop')} wired>
              Continuar Comprando
            </ButtonComponent>
          </ButtonsContainer>
        </SumaryContainer>
      </Container>
    </>
  );
};

export default CartPage;
