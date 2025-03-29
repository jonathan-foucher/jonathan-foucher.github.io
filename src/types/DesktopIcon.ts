export default interface DesktopIcon {
  source: string
  isSourceIcon: boolean
  text: string
  isOpenNewIcon?: boolean
  action: () => void
}
