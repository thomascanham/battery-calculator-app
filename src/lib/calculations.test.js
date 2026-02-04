import { describe, it, expect } from 'vitest'
import {
  roundNumber,
  calculateBatteryCapacity,
  isValidPositiveNumber,
  isValidNonNegativeNumber,
} from './calculations'

describe('roundNumber', () => {
  it('rounds to 2 decimal places', () => {
    expect(roundNumber(1.234)).toBe(1.23)
    expect(roundNumber(1.235)).toBe(1.24)
    expect(roundNumber(1.999)).toBe(2)
  })

  it('handles whole numbers', () => {
    expect(roundNumber(5)).toBe(5)
    expect(roundNumber(100)).toBe(100)
  })

  it('handles zero', () => {
    expect(roundNumber(0)).toBe(0)
  })

  it('handles small decimals', () => {
    expect(roundNumber(0.001)).toBe(0)
    expect(roundNumber(0.005)).toBe(0.01)
    expect(roundNumber(0.01)).toBe(0.01)
  })
})

describe('calculateBatteryCapacity', () => {
  // Default values from the app
  const defaultParams = {
    fiddleFactor: 1.25,
    Ts: 24,
    Ta: 0.5,
  }

  it('calculates correctly with typical values', () => {
    const result = calculateBatteryCapacity({
      ...defaultParams,
      Is: 0.5,
      Ia: 2,
    })
    // 1.25 × [(24 × 0.5) + (0.5 × 2)] = 1.25 × [12 + 1] = 1.25 × 13 = 16.25
    expect(result).toBe(16.25)
  })

  it('calculates correctly with zero currents', () => {
    const result = calculateBatteryCapacity({
      ...defaultParams,
      Is: 0,
      Ia: 0,
    })
    expect(result).toBe(0)
  })

  it('calculates correctly with only quiescent current', () => {
    const result = calculateBatteryCapacity({
      ...defaultParams,
      Is: 1,
      Ia: 0,
    })
    // 1.25 × [(24 × 1) + (0.5 × 0)] = 1.25 × 24 = 30
    expect(result).toBe(30)
  })

  it('calculates correctly with only alarm current', () => {
    const result = calculateBatteryCapacity({
      ...defaultParams,
      Is: 0,
      Ia: 4,
    })
    // 1.25 × [(24 × 0) + (0.5 × 4)] = 1.25 × 2 = 2.5
    expect(result).toBe(2.5)
  })

  it('handles decimal inputs correctly', () => {
    const result = calculateBatteryCapacity({
      fiddleFactor: 1.25,
      Ts: 24,
      Ta: 0.5,
      Is: 0.15,
      Ia: 1.75,
    })
    // 1.25 × [(24 × 0.15) + (0.5 × 1.75)] = 1.25 × [3.6 + 0.875] = 1.25 × 4.475 = 5.59375 → 5.59
    expect(result).toBe(5.59)
  })

  it('handles large values', () => {
    const result = calculateBatteryCapacity({
      fiddleFactor: 1.25,
      Ts: 72,
      Ta: 2,
      Is: 5,
      Ia: 20,
    })
    // 1.25 × [(72 × 5) + (2 × 20)] = 1.25 × [360 + 40] = 1.25 × 400 = 500
    expect(result).toBe(500)
  })

  it('throws error for invalid fiddle factor', () => {
    expect(() =>
      calculateBatteryCapacity({
        ...defaultParams,
        fiddleFactor: 0,
        Is: 1,
        Ia: 1,
      })
    ).toThrow('Fiddle factor must be greater than 0')

    expect(() =>
      calculateBatteryCapacity({
        ...defaultParams,
        fiddleFactor: -1,
        Is: 1,
        Ia: 1,
      })
    ).toThrow('Fiddle factor must be greater than 0')
  })

  it('throws error for negative time values', () => {
    expect(() =>
      calculateBatteryCapacity({
        fiddleFactor: 1.25,
        Ts: -1,
        Ta: 0.5,
        Is: 1,
        Ia: 1,
      })
    ).toThrow('Standby time cannot be negative')

    expect(() =>
      calculateBatteryCapacity({
        fiddleFactor: 1.25,
        Ts: 24,
        Ta: -0.5,
        Is: 1,
        Ia: 1,
      })
    ).toThrow('Alarm time cannot be negative')
  })

  it('throws error for negative current values', () => {
    expect(() =>
      calculateBatteryCapacity({
        ...defaultParams,
        Is: -1,
        Ia: 1,
      })
    ).toThrow('Quiescent current cannot be negative')

    expect(() =>
      calculateBatteryCapacity({
        ...defaultParams,
        Is: 1,
        Ia: -1,
      })
    ).toThrow('Alarm current cannot be negative')
  })
})

describe('isValidPositiveNumber', () => {
  it('returns true for positive numbers', () => {
    expect(isValidPositiveNumber(1)).toBe(true)
    expect(isValidPositiveNumber(0.5)).toBe(true)
    expect(isValidPositiveNumber(100)).toBe(true)
  })

  it('returns false for zero', () => {
    expect(isValidPositiveNumber(0)).toBe(false)
  })

  it('returns false for negative numbers', () => {
    expect(isValidPositiveNumber(-1)).toBe(false)
    expect(isValidPositiveNumber(-0.5)).toBe(false)
  })

  it('returns false for non-numbers', () => {
    expect(isValidPositiveNumber('1')).toBe(false)
    expect(isValidPositiveNumber(null)).toBe(false)
    expect(isValidPositiveNumber(undefined)).toBe(false)
    expect(isValidPositiveNumber(NaN)).toBe(false)
  })
})

describe('isValidNonNegativeNumber', () => {
  it('returns true for positive numbers', () => {
    expect(isValidNonNegativeNumber(1)).toBe(true)
    expect(isValidNonNegativeNumber(0.5)).toBe(true)
  })

  it('returns true for zero', () => {
    expect(isValidNonNegativeNumber(0)).toBe(true)
  })

  it('returns false for negative numbers', () => {
    expect(isValidNonNegativeNumber(-1)).toBe(false)
  })

  it('returns false for non-numbers', () => {
    expect(isValidNonNegativeNumber('1')).toBe(false)
    expect(isValidNonNegativeNumber(null)).toBe(false)
    expect(isValidNonNegativeNumber(NaN)).toBe(false)
  })
})
