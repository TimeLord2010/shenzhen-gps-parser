import { StringByteReader } from '../string_byte_reader.mjs'
import { LocationReader } from './location_reader.mjs'
import { TerminalReader } from './terminal_reader.mjs'

export class AlarmReader extends LocationReader {

    /**
     * Voltage level
     * Range from 0 to 6:
     * - 0: No voltage
     * - 1: Extremely low voltage
     * - 2: Very low voltage
     * - 3: Low voltage
     * - 4: Normal voltage
     * - 5: High voltage
     * - 6: Extremely high voltage
     * @type {number}
     */
    voltageLevel

    /**
     * GSM signal level
     * Range from 0 to 4:
     * - 0: No signal
     * - 1: Extremely low signal
     * - 2: Very low signal
     * - 3: Good signal
     * - 4: Strong signal
     */
    signalLevel

    /**
     * @type {number}
     */
    language

    /**
     *
     * @param {string} value
     */
    constructor(value) {
        super(value)

        const restContent = value.slice(-(5 * 2))
        const reader = new StringByteReader(restContent)

        let terminalInfo = reader.read()
        this.terminal = new TerminalReader(terminalInfo)

        this.voltageLevel = reader.readByte()
        this.signalLevel = reader.readByte()

        const alarmType = reader.readByte()
        this.alarmType = alarmType

        this.language = reader.readByte()
    }

    get languageLabel() {
        return this.language == 1 ? 'Chinese' : 'English'
    }

    get alarmTypeLabel() {
        const alarmTypeDict = Object.freeze({
            0: 'Normal',
            1: 'SOS',
            2: 'Power Cut',
            3: 'Shock',
            4: 'Fence In Alarm',
            5: 'Fence Out Alarm',
        })
        return alarmTypeDict[this.alarmType]
    }
}