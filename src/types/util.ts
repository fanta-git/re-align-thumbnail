export type Values<T extends readonly any[]> = T[number]
export type ValuesObj<T extends Record<any, any>> = T[keyof T]
export type Split<T extends string, S extends string> =
  T extends `${infer P}${S}${infer R}`
    ? string extends P
      ? [P]
      : [P, ...Split<R, S>]
    : [T]
