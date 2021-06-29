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
  lotteries: Lotto[] | [],
  purchaseQuantity: number,
  winnings: string[],
}

type LottoPurchaseState = {
  total: HTMLElement,
  tickets: HTMLElement,
  balls: HTMLElement,
  lotteries: Lotto[] | [],
}

type LottoWinningState = {
  winningNumbers: number[] | [],
  bonusNumber: number,
  openModalButton: HTMLButtonElement,
}

export {
  LottoComponent, LottoInputProps, Lotto, LottoMachineState,
  LottoPurchaseState, LottoWinningState,
};
