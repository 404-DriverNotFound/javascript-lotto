interface LottoComponent {

}

interface LottoInputProps {
  $element: HTMLInputElement,
  buy: (cost: string) => void;
}

type Lotto = [number, number, number, number, number, number, number] | [];

type LottoMachineState = {
  mode: boolean,
  budget: number,
  lotteries: Lotto[],
  purchaseQuantity: number,
  winnings: Lotto,
}

type LottoPurchaseState = {
  total: HTMLElement,
  tickets: HTMLElement,
  balls: HTMLElement,
  lotteries: Lotto[],
}

type LottoWinningState = {
  winningNumbers: Lotto,
  bonusNumber: number,
  openModalButton: HTMLButtonElement,
}

export {
  LottoComponent, LottoInputProps, Lotto, LottoMachineState,
  LottoPurchaseState, LottoWinningState,
};
