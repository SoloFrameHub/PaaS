export class ManifestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ManifestError';
  }
}

export class ManifestLockMismatchError extends ManifestError {
  constructor(
    public readonly assetPath: string,
    public readonly expected: string,
    public readonly actual: string,
  ) {
    super(
      `manifest.lock mismatch for ${assetPath}: expected ${expected} got ${actual}`,
    );
    this.name = 'ManifestLockMismatchError';
  }
}
