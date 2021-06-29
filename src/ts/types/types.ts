interface LottoComponent {

}

interface LottoInputProps {
  $element: HTMLInputElement,
  buy: (cost: string) => void;
}

type Lotto = {
  'first': number,
  'second': number,
  'third': number,
  'fourth': number,
  'fifth': number,
  'sixth': number,
};

type LottoMachineState = {
  mode: boolean,
  budget: number,
  lotteries: [Lotto] | [],
  purchaseQuantity: number,
}

type LottoBoardState = {
  total: HTMLElement,
  tickets: HTMLElement,
  balls: HTMLElement,
  lotteries: [Lotto] | [],
}

export {
  LottoComponent, LottoInputProps, Lotto, LottoMachineState,
  LottoBoardState,
};
