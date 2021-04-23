export class SessionUser {
  static fromFireBase({ uid, name, email }) {
    return new SessionUser(uid, name, email);
  }

  constructor(
    public uid: string,
    public name: string,
    public email: string,
  ) { }
}
