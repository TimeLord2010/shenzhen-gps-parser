import { describe, expect, it } from 'vitest'
import { AlarmReader } from './alarm_reader.mjs'

describe('alarmReader', () => {
    const dateHex = '0A03170F3217'

    const gpsHex = [
        'CC',       // satellites
        '026B3F3E', // latitude
        '0C465849', // longitude
        '00',       // speed
        '148F',     // courseStatus
        '01CC',     // mcc
        '00',       // mnc
        '287D',     // lac
        '001FB8',   // cellId
        '0003',     // serialNo
        '80810D0A',
    ].join('')

    const alarmHex = [
        '44',   // terminalInfo
        '06',   // Voltage level
        '04',   // GSM Signal
        '0101', // Alarm / Language
    ].join('')

    const hex = [
        dateHex,
        gpsHex,
        alarmHex,
        // '0036', // Serial No
        // '56A4', // CRC
        // '0D0A', // Stop bit
    ].join('')

    const alarm = new AlarmReader(hex)

    it('should correctly read the voltage level', () => {
        expect(alarm.voltageLevel).toBe(6)
    })

    it('should correctly read the signal level', () => {
        expect(alarm.signalLevel).toBe(4)
    })

    it('should correctly read the language', () => {
        expect(alarm.languageLabel).toBe('Chinese')
    })
})