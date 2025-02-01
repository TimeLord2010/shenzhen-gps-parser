import { StringByteReader } from '../string_byte_reader.mjs'
import { GpsInfoReader } from './gps_info_reader.mjs'

export class LocationReader {

    /**
     * Mobile Country Code
     * @type {number}
     */
    mcc

    /**
     * Mobile Network Code
     * @type {number}
     */
    mnc

    /**
     *  Location Area Code
     * @type {number}
     */
    lac

    /**
     * Cell Tower ID
     * @type {string}
     */
    cellId

    /**
     *
     * @param {string} value
     */
    constructor(value) {
        const gpsLen = GpsInfoReader.byteLength * 2
        const gpsHex = value.substring(0, gpsLen)
        this.gps = new GpsInfoReader(gpsHex)

        // LBS info
        const reader = new StringByteReader(value.substring(gpsLen))

        this.mcc = reader.readShort()
        this.mnc = reader.readByte()
        this.lac = reader.readShort()
        this.cellId = reader.read(3)
    }

    /**
     * @returns {string | undefined}
     */
    getResponse() {
        return undefined
    }
}

/**
 *
 * @param {number} value
 */
function readCoordenate(value) {
    const minutes = value / 30000
    const degrees = minutes / 60
    return degrees
}