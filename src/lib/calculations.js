/**
 * Rounds a number to 2 decimal places
 * @param {number} num - Number to round
 * @returns {number} Rounded number
 */
export function roundNumber(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

/**
 * Calculates the required battery capacity in AmpHr
 * Formula: fiddleFactor × [(Ts × Is) + (Ta × Ia)]
 *
 * @param {Object} params - Calculation parameters
 * @param {number} params.fiddleFactor - Deterioration/safety factor (typically 1.25)
 * @param {number} params.Ts - Time in standby (hours)
 * @param {number} params.Is - Current in standby/quiescent (Amps)
 * @param {number} params.Ta - Time in alarm (hours)
 * @param {number} params.Ia - Current in alarm (Amps)
 * @returns {number} Required battery capacity in AmpHr
 */
export function calculateBatteryCapacity({ fiddleFactor, Ts, Is, Ta, Ia }) {
  if (fiddleFactor <= 0) throw new Error('Fiddle factor must be greater than 0');
  if (Ts < 0) throw new Error('Standby time cannot be negative');
  if (Ta < 0) throw new Error('Alarm time cannot be negative');
  if (Is < 0) throw new Error('Quiescent current cannot be negative');
  if (Ia < 0) throw new Error('Alarm current cannot be negative');

  const standbyConsumption = Ts * Is;
  const alarmConsumption = Ta * Ia;
  const result = fiddleFactor * (standbyConsumption + alarmConsumption);

  return roundNumber(result);
}

/**
 * Validates that a value is a positive number
 * @param {*} value - Value to validate
 * @returns {boolean} True if valid
 */
export function isValidPositiveNumber(value) {
  return typeof value === 'number' && !isNaN(value) && value > 0;
}

/**
 * Validates that a value is a non-negative number
 * @param {*} value - Value to validate
 * @returns {boolean} True if valid
 */
export function isValidNonNegativeNumber(value) {
  return typeof value === 'number' && !isNaN(value) && value >= 0;
}
