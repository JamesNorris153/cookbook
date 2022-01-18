export abstract class Factory<Type> {
  public abstract create(data: any): Type;
}
