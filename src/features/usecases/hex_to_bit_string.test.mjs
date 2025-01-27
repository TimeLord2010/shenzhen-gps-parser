// hexToBitString.test.js
import { describe, expect, it } from 'vitest'
import { hexToBitString } from './hex_to_bit_string.mjs'

describe('hexToBitString', () => {
    it('should convert a hex string to a bit string', () => {
        expect(hexToBitString('A')).toBe('1010')
        expect(hexToBitString('1F')).toBe('00011111')
        expect(hexToBitString('123')).toBe('000100100011')
    })

    it('should throw an error for invalid hex strings', () => {
        expect(() => hexToBitString('G')).toThrow('Invalid hex string')
        expect(() => hexToBitString('xyz')).toThrow('Invalid hex string')
    })

    it('should handle empty strings', () => {
        expect(hexToBitString('')).toBe('')
    })
})