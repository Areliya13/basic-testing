// Uncomment the code below and write your tests
import {
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

const balance = 100;
const withdrawBadBalance = 200;
const withdrawGoodBalance = 50;
const errorMsg = `Insufficient funds: cannot withdraw more than ${balance}`;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(balance);
    expect(acc.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(balance);
    expect(() => acc.withdraw(withdrawBadBalance)).toThrow(errorMsg);
  });

  test('should throw error when transferring more than balance', () => {
    const acc = getBankAccount(balance);
    const toAcc = getBankAccount(balance);
    expect(() => acc.transfer(withdrawBadBalance, toAcc)).toThrow(errorMsg);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(balance);
    expect(() => acc.transfer(balance, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(balance);
    acc.deposit(withdrawBadBalance);
    expect(acc.getBalance()).toBe(balance + withdrawBadBalance);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(balance);
    acc.withdraw(withdrawGoodBalance);
    expect(acc.getBalance()).toBe(balance - withdrawGoodBalance);
  });

  test('should transfer money', () => {
    const accFrom = getBankAccount(balance);
    const accTo = getBankAccount(0);
    accFrom.transfer(withdrawGoodBalance, accTo);
    expect(accFrom.getBalance()).toBe(balance - withdrawGoodBalance);
    expect(accTo.getBalance()).toBe(withdrawGoodBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(balance);
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(withdrawGoodBalance)
      .mockReturnValueOnce(withdrawGoodBalance);
    const res = await acc.fetchBalance();
    expect(typeof res).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(balance);
    jest.spyOn(lodash, 'random').mockReturnValueOnce(withdrawGoodBalance);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(withdrawGoodBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(balance);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValueOnce(null);

    const syncBalance = acc.synchronizeBalance.bind(acc);
    expect(syncBalance).rejects.toThrow(SynchronizationFailedError);
  });
});
