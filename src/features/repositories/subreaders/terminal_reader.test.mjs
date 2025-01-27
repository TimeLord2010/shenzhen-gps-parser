import { describe, expect, it } from 'vitest'
import { TerminalReader } from './terminal_reader.mjs'

describe('terminalReader', () => {

    const reader = new TerminalReader('44')

    it('should correctly read the terminal info', () => {
        expect(reader.oilAndEletricityConnected).toBe(true)
        expect(reader.gpsTrackingOn).toBe(true)
        expect(reader.alarmType).toBe('Normal')
        expect(reader.charge).toBe(true)
        expect(reader.accHigh).toBe(false)
        expect(reader.activated).toBe(false)
    })
})