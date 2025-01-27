/**
 * Converts a hex string to a bit string.
 * @param {string} hexString - The hex string to convert.
 * @returns {string} The resulting bit string.
 */
export function hexToBitString(hexString) {
    if (hexString === '') {
        return ''
    }
    if (typeof hexString !== 'string' || !/^[0-9A-Fa-f]+$/.test(hexString)) {
        throw new Error('Invalid hex string')
    }
    return hexString.split('')
        .map(char => {
            return parseInt(char, 16).toString(2).padStart(4, '0')
        })
        .join('')
}