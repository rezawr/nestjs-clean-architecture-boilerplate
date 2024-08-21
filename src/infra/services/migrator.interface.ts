interface IMigrator {
  wait(): Promise<void>;

  migrate(): Promise<void>;
}

export { IMigrator };
