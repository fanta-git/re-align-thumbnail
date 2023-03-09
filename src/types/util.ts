export type Values<T extends readonly any[]> = T[number]
export type ValuesObj<T extends Record<any, any>> = T[keyof T]
