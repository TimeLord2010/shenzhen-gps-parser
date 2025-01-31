import { StringByteReader } from '../string_byte_reader.mjs'

export class LoginReader {

    /**
     *
     * @param {string} value
     */
    constructor(value) {
        const reader = new StringByteReader(value)

        let terminalId = reader.read(8)

        if (!reader.isEmpty) {
            throw new Error('Invalid login message')
        }

        while (terminalId.startsWith('0')) {
            terminalId = terminalId.substr(1)
        }

        this.terminalId = terminalId
    }

    getResponse() {
        return undefined
    }
}