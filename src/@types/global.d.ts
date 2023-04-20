type Constructor<T> = Function & { prototype: T };
type ConstructorFunction<T> = new (...agrs: any[]) => T;
