
import { StringByteReader } from './string_byte_reader.mjs'
import { LocationReader } from './subreaders/location_reader.mjs'
import { LoginReader } from './subreaders/login_reader.mjs'

export class GpsDataReader {

    /**
     * @type {number}
     */
    protocolNumber

    /**
     * Protocol number + Data + Information serial number + CRC.
     * Or (5 + Data.length) bytes.
     * @type {number}
     */
    packetLength

    /**
     * Parses a GPS data packet.
     *
     * The packet is composed of:
     * - Start byte: 0x7878
     * - Packet length: 1 byte
     * - Protocol number: 1 byte
     * - Data: variable length
     * - Information serial number: 2 bytes
     * - CRC: 2 bytes
     * - Stop bit: 0x0D0A
     * @param {string} packet HEX string
     */
    constructor(packet) {
        const reader = new StringByteReader(packet)

        let startByte = reader.read(2)
        if (startByte != '7878') {
            throw new Error('Invalid start byte')
        }

        this.packetLength = reader.readByte()

        this.protocolNumber = reader.readByte()

        const stopBit = reader.read(2)
        if (stopBit != '0D0A') {
            throw new Error('Invalid stop bit')
        }

        this.crc = reader.read(2)
        // TODO: Check CRC-ITU code

        this.informationSerialNumber = reader.read(2)

        this.data = reader.readAll()
    }

    get protocolMode() {
        switch (this.protocolNumber) {
            case 0x01:
                return 'Login'
            case 0x12:
                return 'Location'
            case 0x13:
                return 'Status'
            case 0x15:
                return 'String'
            case 0x16:
                return 'Alarm'
            case 0x1a:
                return 'GPS, query by phone'
            case 0x80:
                return 'Command sent by the server'
            default:
                return 'Unknown'
        }
    }

    getData() {
        const mode = this.protocolMode
        switch (mode) {
            case 'Login':
                return new LoginReader(this.data)
            case 'Location':
                return new LocationReader(this.data)
            default:
                throw new Error('Unknown protocol mode')
        }
    }

    getResponse() {
        const mode = this.protocolMode
        switch (mode) {
            case 'Login':
                return [
                    '7878',
                    this.packetLength.toString(16).padStart(2, '0'),
                    this.protocolNumber.toString(16).padStart(2, '0'),
                    this.informationSerialNumber,
                    this.crc,
                    '0D0A'
                ].join('')
            default:
                throw new Error('Unknown protocol mode')
        }
    }

}