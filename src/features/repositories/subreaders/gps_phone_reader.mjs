import { StringByteReader } from '../string_byte_reader.mjs'
import { GpsInfoReader } from './gps_info_reader.mjs'

export class GpsPhoneReader {
    /**
     *
     * @param {string} value
     */
    constructor(value) {
        const reader = new StringByteReader(value)

        this.gps = new GpsInfoReader(reader.read(GpsInfoReader.byteLength))

        this.phone = reader.read(21)

        this.language = reader.read(2)

    }

    getResponse() {
        return [

        ].join('\n')
    }
}