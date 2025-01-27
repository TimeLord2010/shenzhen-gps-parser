import { describe, expect, it } from 'vitest'
import { StringByteReader } from './string_byte_reader.mjs' // Adjust the import path as needed

describe('StringByteReader', () => {

    it('should correctly readLong for positive integers', () => {
        const reader = new StringByteReader('7FFFFFFF')
        const result = reader.readLong()
        expect(result).toBe(2147483647)
    })

    it('should correctly readSignedLong for negative integers', () => {
        const reader = new StringByteReader('FFFFFFFF')
        const result = reader.readSignedLong()
        expect(result).toBe(-1)
    })

    it('should correctly readByte', () => {
        const reader = new StringByteReader('01FF')
        const byte1 = reader.readByte()
        const byte2 = reader.readByte()
        expect(byte1).toBe(1)
        expect(byte2).toBe(255)
    })
})