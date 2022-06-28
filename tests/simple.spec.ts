import { psiSquared } from "../src"

test("psi_squared()", () => {
  expect(psiSquared(0, [1, 2]).map(x => x.toFixed(2))).toStrictEqual(["0.21", "0.01"])
})
