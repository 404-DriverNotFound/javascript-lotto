const AUTO: boolean = false;
const MANUAL: boolean = true;
const TICKET_COST = 1000;
const MAX_TICKET_COST = 100000;
const LOTTO_NUMBER_START = 1;
const LOTTO_NUMBER_END = 45;
const LOTTO_LENGTH = 6;
const ERROR_NUMBER_RANGE = '1 ~ 45사이의 숫자를 입력해주십시오.';
const ERROR_MISSING_NUMBER = '번호를 모두 입력해주십시오.';

const defaultLottery = {
  first: -1,
  second: -1,
  third: -1,
  fourth: -1,
  fifth: -1,
  sixth: -1,
};

export {
  AUTO, MANUAL, TICKET_COST, MAX_TICKET_COST,
  LOTTO_NUMBER_START, LOTTO_NUMBER_END,
  LOTTO_LENGTH, defaultLottery,
  ERROR_NUMBER_RANGE, ERROR_MISSING_NUMBER,
};
