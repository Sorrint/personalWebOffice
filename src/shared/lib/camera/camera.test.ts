/* eslint-disable @typescript-eslint/no-explicit-any */
import { takePhoto } from './index';

describe('takePhoto', () => {
  afterEach(() => {
    delete (window as any).NativeCamera;
  });

  test('вызывает NativeCamera.takePhoto если доступна', async () => {
    (window as any).NativeCamera = {
      takePhoto: jest.fn().mockResolvedValue({ base64String: 'abc123' }),
    };

    const result = await takePhoto();

    expect((window as any).NativeCamera.takePhoto).toHaveBeenCalledWith({
      quality: 90,
      allowEditing: false,
      resultType: 'base64',
      source: 'CAMERA',
    });

    expect(result).toBe('abc123');
  });

  test('пробрасывает ошибку из NativeCamera без изменений', async () => {
    (window as any).NativeCamera = {
      takePhoto: jest.fn().mockRejectedValue({ code: 'PERMISSION_DENIED' }),
    };

    await expect(takePhoto()).rejects.toEqual({
      code: 'PERMISSION_DENIED',
    });
  });
});
