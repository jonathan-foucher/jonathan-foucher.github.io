export default interface BootUpStep {
  text: string
  timeMs: number
  isEndOfLine: boolean
  color?: string
}

const SYSTEM_INFO = `
System info
  OS:          Some OS 64-bits
  CPU          2GHz ARM arch
  RAM:         32Go
`

export const BOOT_UP_STEPS: Array<BootUpStep> = [
  {
    text: 'Booting up system...',
    timeMs: 300,
    isEndOfLine: false,
  },
  {
    text: 'ok',
    timeMs: 1000,
    isEndOfLine: true,
    color: 'lime',
  },
  {
    text: 'System started',
    timeMs: 0,
    isEndOfLine: true,
  },
  {
    text: SYSTEM_INFO,
    timeMs: 2000,
    isEndOfLine: true,
  },
]
