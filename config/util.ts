const e = process.env;
// load dotenv
require('dotenv').config({
  path: e.ENV_PATH || undefined,
});

// const get_array_env = (name:string, d:string[] = []) =>
//   e[name] ? e[name]!.split(',').map(s => s.trim()) : d;

export const string_to_boolean:{[k:string]:boolean} = {
  TRUE: true,
  1: true,
  true: true,
  T: true,
  t: true,
  FALSE: false,
  0: false,
  false: false,
  F: false,
  f: false,
  undefined: false,
  null: false,
};

export const B = (s:string, d = true) => e[s]! in string_to_boolean ? string_to_boolean[e[s]!] : d;
export const N = (s:string, d:number) => parseInt(e[s]!) || d;
export const S = (s:string, d:string) => e[s] || d;
