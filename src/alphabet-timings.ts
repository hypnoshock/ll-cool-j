export interface AlpabetDict {
  [key: string]: { time: number; duration: number } | undefined;
}

export const alphabetTimings: AlpabetDict = {
  a: { time: 0.1, duration: 0.3 },
  b: { time: 0.5, duration: 0.3 },
  c: { time: 0.9, duration: 0.3 },
  d: { time: 1.295, duration: 0.3 },
  e: { time: 1.7, duration: 0.3 },
  f: { time: 2.08, duration: 0.3 },
  g: { time: 2.49, duration: 0.25 },
  h: { time: 2.86, duration: 0.25 },
  i: { time: 3.25, duration: 0.3 },
  j: { time: 3.63, duration: 0.3 },
  k: { time: 4.04, duration: 0.3 },
  l: { time: 4.43, duration: 0.3 },
  m: { time: 4.8, duration: 0.3 },
  n: { time: 5.2, duration: 0.3 },
  o: { time: 5.56, duration: 0.25 },
  p: { time: 5.9, duration: 0.35 },
  q: { time: 6.31, duration: 0.3 },
  r: { time: 6.7, duration: 0.33 },
  s: { time: 7.1, duration: 0.28 },
  t: { time: 7.45, duration: 0.29 },
  u: { time: 7.8, duration: 0.3 },
  v: { time: 8.17, duration: 0.35 },
  w: { time: 8.7, duration: 0.35 },
  x: { time: 9.13, duration: 0.21 },
  y: { time: 9.38, duration: 0.13 },
  z: { time: 9.59, duration: 0.4 },
  " ": { time: 8.57, duration: 0.17 },
};
