// NOTE Get values type from a obj type
type TypesValues<T, AllowTypes> = {
	[K in keyof T]: T[K] extends AllowTypes ? T[K] : never;
}[keyof T];

export type StringValues<T> = TypesValues<T, string>;

export type NumericValues<T> = TypesValues<T, number>;

export type AllValues<T> = T[keyof T];

//NOTE Basis usage type Type = AllKeys<typeof Obj>;