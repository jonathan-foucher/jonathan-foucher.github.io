export function useRedirection() {
  const GITHUB_PROFILE_URL = 'https://github.com/jonathan-foucher'
  const CURRENT_PROJECT_NAME = 'jonathan-foucher.github.io'
  const LINKED_IN_PROFILE_URL = 'https://linkedin.com/in/jonathanfoucher/'
  const ROOT_ME_PROFILE_URL = 'https://www.root-me.org/Jonathan-608847'

  const openInNewTab = (url: string) => {
    open(url, '_blank')
  }

  const getGithubProjectUrl = (projectName: string = CURRENT_PROJECT_NAME) => `${GITHUB_PROFILE_URL}/${projectName}`

  return {
    GITHUB_PROFILE_URL,
    LINKED_IN_PROFILE_URL,
    ROOT_ME_PROFILE_URL,
    openInNewTab,
    getGithubProjectUrl,
  }
}
