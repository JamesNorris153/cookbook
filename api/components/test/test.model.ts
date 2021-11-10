import { ObjectId } from 'mongodb';

export class Test {
  public constructor(
    public name: string,
    public id?: ObjectId) { }
}
