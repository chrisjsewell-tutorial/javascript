/** Find the factorial of a number */
export function factorial(n: number): number {
  return n === 0 ? 1 : n * factorial(n - 1)
}

/** Normalization constant */
export function norm(v: number): number {
  return 1.0 / Math.sqrt(Math.sqrt(Math.PI) * 2 ** v * factorial(v))
}

const _HERMITES: { [value: number]: (x: number) => number } = {
  0: () => {
    return 1
  },
  1: (x: number) => {
    return 2 * x
  },
  2: (x: number) => {
    return 4 * x ** 2 - 2
  },
  3: (x: number) => {
    return 8 * x ** 3 - 12 * x
  },
  4: (x: number) => {
    return 16 * x ** 4 - 48 * x ** 2 + 12
  },
  5: (x: number) => {
    return 32 * x ** 5 - 160 * x ** 3 + 120 * x
  },
  6: (x: number) => {
    return 64 * x ** 6 - 480 * x ** 4 + 720 * x ** 2 - 120
  },
  7: (x: number) => {
    return 128 * x ** 7 - 1344 * x ** 5 + 3360 * x ** 3 - 1680 * x
  },
  8: (x: number) => {
    return 256 * x ** 8 - 3584 * x ** 6 + 13440 * x ** 4 - 13440 * x ** 2 + 1680
  },
  9: (x: number) => {
    return 512 * x ** 9 - 9216 * x ** 7 + 48384 * x ** 5 - 80640 * x ** 3 + 30240 * x
  },
  10: (x: number) => {
    return (
      1024 * x ** 10 -
      30720 * x ** 8 +
      180224 * x ** 6 -
      300720 * x ** 4 +
      158720 * x ** 2 -
      30240
    )
  }
}

/** Return the hermite polynomial for the given level" */
export function getHermitePoly(v: number): (x: number) => number {
  return _HERMITES[v]
}

/** Harmonic oscillator wavefunction for level v computed on grid of points x */
export function psi(v: number, xs: number[]): number[] {
  const hermitePoly = getHermitePoly(v)
  const psi_x: number[] = []
  for (const x_i of xs) {
    psi_x.push(norm(v) * hermitePoly(x_i) * Math.exp(-0.5 * Math.pow(x_i, 2)))
  }
  return psi_x
}

/** Harmonic oscillator wavefunction for level v computed on grid of points x */
export function psiSquared(v: number, xs: number[], shift = 0): number[] {
  return psi(v, xs).map(x => x * x + shift)
}

/** Eigenvalues in units of h */
export function eigenvalue(v: number): number {
  return v + 0.5
}

/** Potential energy function */
export function potential_energy(xs: number[]): number[] {
  return xs.map(x => 0.5 * Math.pow(x, 2))
}

/** Linearly spaced list of numbers */
export function linspace(start: number, stop: number, num: number): number[] {
  return Array(num)
    .fill(0)
    .map((_, i) => start + ((stop - start) * i) / (num - 1))
}
