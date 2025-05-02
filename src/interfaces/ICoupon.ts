interface ICoupon {
  id: number;
  name: string;
  couponType: 'PROMOCIONAL' | 'DEVOLUCAO';
  discount: number;
}

export default ICoupon;
