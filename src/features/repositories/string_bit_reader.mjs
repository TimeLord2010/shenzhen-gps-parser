import { hexToBitString } from '../usecases/hex_to_bit_string.mjs'

export class StringBitReader {
    /**
     * @param {string} value
     */
    constructor(value) {
        if (typeof value !== 'string') {
            throw new Error('StringBitReader expects a string')
        }
        value = value.toUpperCase()
        if (!/^[01]+$/.test(value)) {
            throw new Error('StringBitReader expects a binary string')
        }
        this.initialValue = value
        this.currentValue = value
    }

    /**
     *
     * @param {string} value
     */
    static fromHex(value) {
        const binary = hexToBitString(value)
        return new StringBitReader(binary)
    }

    get isEmpty() {
        return this.currentValue.length === 0
    }

    /**
     * @private
     * @param {number} length
     */
    ensureBitLength(length) {
        if (length < 1) {
            throw new Error('Invalid number of bits')
        }
        if (this.currentValue.length < length) {
            throw new Error('Not enough bits to read')
        }
    }

    read(bits = 1) {
        this.ensureBitLength(bits)
        const value = this.currentValue.slice(0, bits)
        this.currentValue = this.currentValue.slice(bits)
        return value
    }

    readEnd(bits = 1) {
        this.ensureBitLength(bits)
        const value = this.currentValue.slice(-bits)
        this.currentValue = this.currentValue.slice(0, -bits)
        return value
    }

    readAll() {
        const value = this.currentValue
        this.currentValue = ''
        return value
    }

    readBit() {
        return this.read(1) === '1' ? 1 : 0
    }
}