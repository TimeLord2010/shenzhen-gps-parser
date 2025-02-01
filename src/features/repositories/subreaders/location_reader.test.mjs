import { describe, expect, it } from 'vitest'
import { LocationReader } from './location_reader.mjs'

describe('LocationReader', () => {

    const dateHex = '0A03170F3217'

    const satellitesQuantity = 'CC'
    const latitude = '026B 3F3E'.replaceAll(' ', '')
    const longitude = '0C465849'
    const speed = '00'
    const courseStatus = '148F'
    const mcc = '01CC'
    const mnc = '00'
    const lac = '287D'
    const cellId = '001FB8'
    const serialNo = '0003'
    const gpsHex = [
        satellitesQuantity,
        latitude,
        longitude,
        speed,
        courseStatus,
        mcc,
        mnc,
        lac,
        cellId,
        serialNo,
        '80810D0A'
    ].join('')

    const hex = [dateHex, gpsHex].join('')

    const reader = new LocationReader(hex)

    it('should correctly read the date', () => {
        // 2010-03-23 15:30:23
        const date = reader.gps.date
        expect(date.getFullYear()).toBe(2010)
        expect(date.getMonth()).toBe(2)
        expect(date.getDate()).toBe(23)

        expect(date.getHours()).toBe(15)
        expect(date.getMinutes()).toBe(50)
        expect(date.getSeconds()).toBe(23)
    })

    it('should correctly read the GPS data', () => {
        expect(reader.gps.quantity).toBe(204)

        expect(reader.gps.latitude).toBeCloseTo(22.546096)

        expect(reader.cellId).toBe('001FB8')
    })
})