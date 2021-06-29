import {
  TICKET_COST,
  MAX_TICKET_COST,
  LOTTO_NUMBER_START,
  LOTTO_NUMBER_END, LOTTO_LENGTH,
} from '../constant/constant.js';
import { Lotto } from '../types/types.js';

const between = (value: number, start: number, end: number) => (value >= start && value <= end);
const isValidCost = (cost: string): boolean => between(Number(cost), TICKET_COST, MAX_TICKET_COST);
const defaultPurchaseQuantity = (budget: number) => Math.floor(budget / TICKET_COST);

const getRandomInt = (start: number, end: number): number => Math.floor(
  Math.random() * (end - start) + start,
);

const ascending = (a: number, b: number): number => a - b;

const getRandomLottery = (): Lotto => {
  const lotto = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
  const numbers = [...new Array(LOTTO_LENGTH)]
    .map(() => getRandomInt(LOTTO_NUMBER_START, LOTTO_NUMBER_END))
    .sort(ascending);
  return lotto.reduce((o, k, i) => ({ ...o, [k]: numbers[i] }), {})as Lotto;
};

const makeLotto = (purchaseQuantity: number): [Lotto] => [...new Array(purchaseQuantity)]
  .map(() => getRandomLottery())as [Lotto];

export { isValidCost, defaultPurchaseQuantity, makeLotto };
