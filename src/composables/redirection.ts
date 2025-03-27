export function useRedirection() {
  const GITHUB_PROFILE_URL = 'https://github.com/jonathan-foucher'
  const GITHUB_PROJECT_URL = 'https://github.com/jonathan-foucher/jonathan-foucher.github.io'
  const LINKED_IN_PROFILE_URL = 'https://linkedin.com/in/jonathanfoucher/'
  const ROOT_ME_PROFILE_URL = 'https://root-me.org/Jonathan-608847'

  const openInNewTab = (url: string) => {
    open(url, '_blank')
  }

  return {
    GITHUB_PROFILE_URL,
    GITHUB_PROJECT_URL,
    LINKED_IN_PROFILE_URL,
    ROOT_ME_PROFILE_URL,
    openInNewTab,
  }
}
