/* eslint-disable @typescript-eslint/no-explicit-any */
import { scanBarcode } from './index';

describe('scanBarcode', () => {
  afterEach(() => {
    delete (window as any).NativeScanner;
    jest.clearAllMocks();
  });

  test('вызывает NativeScanner.scan если доступен', async () => {
    (window as any).NativeScanner = {
      scan: jest.fn().mockResolvedValue({ text: '4607049095541', format: 'EAN_13' }),
    };

    const result = await scanBarcode();

    expect((window as any).NativeScanner.scan).toHaveBeenCalledTimes(1);
    expect(result).toBe('4607049095541');
  });

  test('пробрасывает ошибку из NativeScanner без изменений', async () => {
    (window as any).NativeScanner = {
      scan: jest.fn().mockRejectedValue({ code: 'TIMEOUT' }),
    };

    await expect(scanBarcode()).rejects.toEqual({
      code: 'TIMEOUT',
    });
  });

  test('возвращает NOT_AVAILABLE в браузере без NativeScanner', async () => {
    await expect(scanBarcode()).rejects.toEqual({
      code: 'NOT_AVAILABLE',
    });
  });
});
