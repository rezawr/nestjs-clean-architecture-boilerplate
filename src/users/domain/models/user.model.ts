class UserRecord {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

class User {
  constructor(
    readonly id: string,
    readonly record: UserRecord,
  ) {}
}

export { UserRecord, User };
