import {
  TICKET_COST,
  LOTTO_NUMBER_START,
  LOTTO_NUMBER_END, LOTTO_LENGTH, FIRST_PRIZE, BONUS_PRIZE, SECOND_PRIZE, THIRD_PRIZE, FOURTH_PRIZE,
} from '../constant/constant.js';
import { Lotto, Prize, PrizeResult } from '../types/types.js';

const isValidRange = (cost: number, start: number, end: number)
  : boolean => (cost >= start && cost <= end);
const defaultPurchaseQuantity = (budget: number) => Math.floor(budget / TICKET_COST);

const getRandomInt = (start: number, end: number): number => Math.floor(
  Math.random() * (end - start) + start,
);

const isDuplicated = (container: Set<number>, value: number):boolean => container.has(value);

const ascending = (a: number, b: number): number => a - b;

const getRandomLottery = (): Lotto => {
  const cache = new Set<number>();
  const numbers = [...new Array(LOTTO_LENGTH)]
    .map(() => {
      let candidate = getRandomInt(LOTTO_NUMBER_START, LOTTO_NUMBER_END);
      while (isDuplicated(cache, candidate)) {
        candidate = getRandomInt(LOTTO_NUMBER_START, LOTTO_NUMBER_END);
      }
      cache.add(candidate);
      return candidate;
    })
    .sort(ascending);
  return numbers as Lotto;
};

const makeLotto = (purchaseQuantity: number): [Lotto] => [...new Array(purchaseQuantity)]
  .map(() => getRandomLottery())as [Lotto];

const getPrizes = (lottery: number[], winnings: number[]): Prize => {
  const normal = lottery.filter((value, index) => value === winnings[index]);
  const bonus = lottery.filter((value) => value === winnings[winnings.length - 1]);
  if (bonus.length > 0 && normal.length === 5) {
    return 'bonusPrize';
  }
  switch (normal.length) {
    case 3:
      return 'fourthPrize';
    case 4:
      return 'thirdPrize';
    case 5:
      return 'secondPrize';
    case 6:
      return 'firstPrize';
    default:
      return 'fail';
  }
};

const getPrizeResult = (lotteries: number[][], winnings: number[]): PrizeResult => {
  const obj: Record<Prize, number> = {
    firstPrize: 0,
    bonusPrize: 0,
    secondPrize: 0,
    thirdPrize: 0,
    fourthPrize: 0,
    fail: 0,
  };

  const prizes: Prize[] = lotteries.map((lottery) => getPrizes(lottery, winnings));
  console.log(prizes);
  return prizes.reduce<Record<Prize, number>>((acc, prize: Prize) => {
    const cp: Record<Prize, number> = { ...acc };
    cp[prize] += 1;
    return cp;
  }, obj);
};

const getProfitRate = (result: PrizeResult, budget: number): number => {
  const total = Object.keys(result).reduce((acc, key) => {
    switch (key) {
      case 'firstPrize':
        return acc + FIRST_PRIZE;
      case 'bonusPrize':
        return acc + BONUS_PRIZE;
      case 'secondPrize':
        return acc + SECOND_PRIZE;
      case 'thirdPrize':
        return acc + THIRD_PRIZE;
      case 'fourthPrize':
        return acc + FOURTH_PRIZE;
      default:
        return acc;
    }
  }, 0);
  return total / budget;
};

export {
  isValidRange, defaultPurchaseQuantity, isDuplicated, ascending, makeLotto,
  getPrizeResult, getProfitRate,
};
