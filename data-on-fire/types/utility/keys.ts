// NOTE Get keys type from a obj type
type TypesKeys<T, AllowTypes> = {
	[K in keyof T]: K extends AllowTypes ? K : never;
}[keyof T];

export type StringKeys<T> = TypesKeys<T, string>;

export type NumericKeys<T> = TypesKeys<T, number>;

export type AllKeys<T> = keyof T;