export class StringByteReader {

    /**
     *
     * @param {string} value
     */
    constructor(value) {

        if (typeof value !== 'string') {
            throw new Error('StringByteReader expects a string')
        }

        value = value.toUpperCase()

        // Checking if the string is a hex string
        if (!/^[0-9A-F]+$/.test(value)) {
            throw new Error('StringByteReader expects a hex string')
        }

        // Checking if the string has an even number of characters
        if (value.length % 2 !== 0) {
            throw new Error('StringByteReader expects a string with an even number of characters')
        }

        this.initialValue = value
        this.currentValue = value
    }

    get isEmpty() {
        return this.currentValue.length === 0
    }

    /**
     * @private
     * @param {number} length
     */
    ensureByteLength(length) {
        if (length < 1) {
            throw new Error('Invalid number of bytes')
        }
        if (this.currentValue.length < length) {
            throw new Error('Not enough bytes to read')
        }
    }

    read(bytes = 1) {
        const lengthToRead = bytes * 2

        this.ensureByteLength(lengthToRead)

        const value = this.currentValue.slice(0, lengthToRead)
        this.currentValue = this.currentValue.slice(lengthToRead)
        return value
    }

    readEnd(bytes = 1) {
        const lengthToRead = bytes * 2

        this.ensureByteLength(lengthToRead)

        const value = this.currentValue.slice(-lengthToRead)
        this.currentValue = this.currentValue.slice(0, -lengthToRead)
        return value
    }

    readAll() {
        const value = this.currentValue
        this.currentValue = ''
        return value
    }

    readByte() {
        const byte = this.read(1)
        return parseInt(byte, 16)
    }

    readShort() {
        const short = this.read(2)
        return parseInt(short, 16)
    }

    readLong() {
        const long = this.read(4)
        return parseInt(long, 16)
    }

    readSignedLong() {
        const long = this.read(4)
        const intValue = parseInt(long, 16)

        // Check if the number is negative
        if (intValue & 0x80000000) {
            return intValue - 0x100000000
        }
        return intValue
    }
}