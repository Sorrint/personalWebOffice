export type CameraError = {
  code: 'PERMISSION_DENIED' | 'UNAVAILABLE' | 'CANCELLED';
};

interface NativeCamera {
  takePhoto: (options: {
    quality: number;
    allowEditing: boolean;
    resultType: 'base64';
    source: 'CAMERA';
  }) => Promise<{ base64String: string }>;
}

declare global {
  interface Window {
    NativeCamera?: NativeCamera;
  }
}

export function takePhoto(): Promise<string> {
  if (window.NativeCamera) {
    return window.NativeCamera.takePhoto({
      quality: 90,
      allowEditing: false,
      resultType: 'base64',
      source: 'CAMERA',
    })
      .then(r => r.base64String)
      .catch(e => Promise.reject(normalizeError(e)));
  }

  return takePhotoWeb();
}

function takePhotoWeb(): Promise<string> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'camera';

    input.onchange = () => {
      const file = input.files?.[0];

      if (!file) {
        reject({ code: 'CANCELLED' });
        input.remove();
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;
        const base64 = result.includes(',') ? result.split(',')[1] : result;

        resolve(base64);
        input.remove();
      };

      reader.onerror = () => {
        reject({ code: 'UNAVAILABLE' });
        input.remove();
      };

      reader.readAsDataURL(file);
    };

    input.click();
  });
}

function normalizeError(err: unknown): CameraError {
  if (typeof err === 'object' && err !== null && 'code' in err) {
    return err as CameraError;
  }

  return { code: 'UNAVAILABLE' };
}
