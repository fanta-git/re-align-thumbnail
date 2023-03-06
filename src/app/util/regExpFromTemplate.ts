export const r = (raw: TemplateStringsArray, ...substitutions: any[]) => new RegExp(String.raw(raw, ...substitutions))
