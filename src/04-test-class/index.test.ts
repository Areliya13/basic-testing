// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

const balance = 100;
const badWithdraw = 200;
const goodWithdraw = 50;
const errorMsg = new InsufficientFundsError(balance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(balance);
    expect(acc.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(balance);
    expect(() => acc.withdraw(badWithdraw)).toThrow(errorMsg);
  });

  test('should throw error when transferring more than balance', () => {
    const acc = getBankAccount(balance);
    const toAcc = getBankAccount(balance);
    expect(() => acc.transfer(badWithdraw, toAcc)).toThrow(errorMsg);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(balance);
    expect(() => acc.transfer(balance, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(balance);
    acc.deposit(badWithdraw);
    expect(acc.getBalance()).toBe(balance + badWithdraw);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(balance);
    acc.withdraw(goodWithdraw);
    expect(acc.getBalance()).toBe(balance - goodWithdraw);
  });

  test('should transfer money', () => {
    const accFrom = getBankAccount(balance);
    const accTo = getBankAccount(0);
    accFrom.transfer(goodWithdraw, accTo);
    expect(accFrom.getBalance()).toBe(balance - goodWithdraw);
    expect(accTo.getBalance()).toBe(goodWithdraw);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(balance);
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(goodWithdraw)
      .mockReturnValueOnce(goodWithdraw);
    const res = await acc.fetchBalance();
    expect(typeof res).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(balance);
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(goodWithdraw)
      .mockReturnValueOnce(goodWithdraw);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(goodWithdraw);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(balance);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValueOnce(null);

    const syncBalance = acc.synchronizeBalance.bind(acc);
    expect(syncBalance).rejects.toThrow(SynchronizationFailedError);
  });
});
