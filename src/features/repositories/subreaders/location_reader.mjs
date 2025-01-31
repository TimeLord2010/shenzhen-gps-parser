import { StringBitReader } from '../string_bit_reader.mjs'
import { StringByteReader } from '../string_byte_reader.mjs'

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
        const reader = new StringByteReader(value)

        // GPS info

        const year = reader.readByte()
        const month = reader.readByte()
        const day = reader.readByte()
        const hour = reader.readByte()
        const minute = reader.readByte()
        const second = reader.readByte()
        this.date = new Date(year + 2000, month - 1, day, hour, minute, second)

        // Two Hex digits
        // The first is the length of the data field
        // The second is the number of satellites
        this.quantity = reader.readByte()

        this.latitude = readCoordenate(reader.readSignedLong())
        this.longitude = readCoordenate(reader.readSignedLong())

        this.speed = reader.readByte()

        const courceStatus = reader.read(2)
        const binReader = StringBitReader.fromHex(courceStatus)

        if (binReader.readBit() != 0 || binReader.readBit() != 0) {
            throw new Error('Invalid course status')
        }

        this.isRealTime = binReader.readBit() == 1

        this.positined = binReader.readBit() == 1

        this.eastLongitude = binReader.readBit() == 1

        this.northLatitude = binReader.readBit() == 1

        const remaingCource = binReader.read(10)
        this.angle = parseInt(remaingCource, 2)

        // LBS info

        this.mcc = reader.readShort()
        this.mnc = reader.readByte()
        this.lac = reader.readShort()
        this.cellId = reader.read(3)
    }

    /**
     * @returns {string | undefined}
     */
    getResponse() {
        // We can semd commands here if we want to.
        // The command is sent in unicode.
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