export default interface BootUpStep {
  text: string
  timeMs: number
  isEndOfLine: boolean
  color?: string
}

const SYSTEM_INFO = `
System info
  OS    :        macOS Sequoia 15.3.2
  CPU   :        Apple M2 Pro 8-core
  GPU   :        Apple M2 Pro 8-core
  RAM   :        24 Go
  DISK  :        SSD - 512 Go
`

export const BOOT_UP_STEPS: Array<BootUpStep> = [
  {
    text: 'Starting the BIOS...',
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
    text: '',
    timeMs: 0,
    isEndOfLine: true,
  },

  {
    text: 'Hardware checks',
    timeMs: 0,
    color: 'royalblue',
    isEndOfLine: true,
  },

  {
    text: '  Checking the CPU...',
    timeMs: 200,
    isEndOfLine: false,
  },
  {
    text: 'ok',
    timeMs: 0,
    isEndOfLine: true,
    color: 'lime',
  },

  {
    text: '  Checking the RAM...',
    timeMs: 200,
    isEndOfLine: false,
  },
  {
    text: 'ok',
    timeMs: 0,
    isEndOfLine: true,
    color: 'lime',
  },

  {
    text: '  Checking the GPU...',
    timeMs: 200,
    isEndOfLine: false,
  },
  {
    text: 'ok',
    timeMs: 0,
    isEndOfLine: true,
    color: 'lime',
  },

  {
    text: '  Checking the Memory...',
    timeMs: 200,
    isEndOfLine: false,
  },
  {
    text: 'ok',
    timeMs: 0,
    isEndOfLine: true,
    color: 'lime',
  },
  {
    text: '',
    timeMs: 0,
    isEndOfLine: true,
  },

  {
    text: 'Software configuration',
    timeMs: 0,
    color: 'royalblue',
    isEndOfLine: true,
  },
  {
    text: '  Loading the OS...',
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
    text: '  Initializing the configurations...',
    timeMs: 300,
    isEndOfLine: false,
  },
  {
    text: 'ok',
    timeMs: 100,
    isEndOfLine: true,
    color: 'lime',
  },

  {
    text: '  Starting system utilities...',
    timeMs: 200,
    isEndOfLine: false,
  },
  {
    text: 'ok',
    timeMs: 0,
    isEndOfLine: true,
    color: 'lime',
  },

  {
    text: '',
    timeMs: 0,
    isEndOfLine: true,
  },

  {
    text: 'System started and ready',
    timeMs: 200,
    color: 'lime',
    isEndOfLine: true,
  },

  {
    text: SYSTEM_INFO,
    timeMs: 200,
    isEndOfLine: true,
  },

  {
    text: 'Starting the OS...',
    timeMs: 100,
    isEndOfLine: true,
  },
]
