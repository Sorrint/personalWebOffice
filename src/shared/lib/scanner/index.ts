export type ScannerError = {
  code: 'TIMEOUT' | 'UNSUPPORTED_FORMAT' | 'CANCELLED' | 'NOT_AVAILABLE';
};

interface NativeScanner {
  scan: () => Promise<{ text: string; format: string }>;
}

declare global {
  interface Window {
    NativeScanner?: NativeScanner;
  }
}

export function scanBarcode(): Promise<string> {
  if (window.NativeScanner) {
    return window.NativeScanner.scan()
      .then(r => r.text)
      .catch(e => Promise.reject(normalizeError(e)));
  }

  return Promise.reject({ code: 'NOT_AVAILABLE' } as ScannerError);
}

function normalizeError(err: unknown): ScannerError {
  if (typeof err === 'object' && err !== null && 'code' in err) {
    return err as ScannerError;
  }

  return { code: 'NOT_AVAILABLE' };
}
