import { describe, expect, it } from 'vitest'
import { LoginReader } from './login_reader.mjs'

describe('LoginReader', () => {
    const terminalHex = '0123456789012345'

    const reader = new LoginReader(terminalHex)

    it('should correctly read the login', () => {
        expect(reader.terminalId).toBe('123456789012345')
    })
})