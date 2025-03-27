export default interface DesktopIcon {
  path: string
  text: string
  isOpenNewIcon?: boolean
  action: () => void
}
