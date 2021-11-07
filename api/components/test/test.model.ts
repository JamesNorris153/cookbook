import { ObjectId } from 'mongodb';

export class Test {
  public constructor(
    public id?: ObjectId,
    public name: string) { }
}
