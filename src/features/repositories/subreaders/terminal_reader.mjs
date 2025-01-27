import { StringBitReader } from '../string_bit_reader.mjs'

export class TerminalReader {

    /**
     *
     * @param {string} value
     */
    constructor(value) {
        const reader = StringBitReader.fromHex(value)
        this.oilAndEletricityConnected = reader.readBit() == 0
        this.gpsTrackingOn = reader.readBit() == 1

        const alarmInfo = reader.read(3)
        const alarmDict = Object.freeze({
            '000': 'Normal',
            '001': 'Shock Alarm',
            '010': 'Power Cut Alarm',
            '011': 'Low Battery Alarm',
            '100': 'SOS Alarm',
        })
        this.alarmType = alarmDict[alarmInfo]
        if (this.alarmType === undefined) {
            throw new Error(`Invalid alarm bite sequence: ${alarmInfo}. Full terminal info: ${reader.initialValue}`)
        }

        this.charge = reader.readBit() == 1
        this.accHigh = reader.readBit() == 1
        this.activated = reader.readBit() == 1

        if (!reader.isEmpty) {
            throw new Error(`Unexpected bytes in terminal info: ${reader.initialValue}`)
        }
    }
}