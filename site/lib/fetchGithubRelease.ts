export interface Params {
  username: string
  repo: string
  version: string
  name: string
}

const RESERVED_HEADERS = ['date', 'etag', 'last-modified']

export async function fetchGithubRelease(params: Params, suffix: 'css' | 'js') {
  const url = `https://github.com/${params.username}/${params.repo}/releases/download/${params.version}/${params.name}.${suffix}`
  const resp = await fetch(url)
  if (resp.status === 200) {
    const content = await resp.text()
    const headers: Record<string, string> = {}
    RESERVED_HEADERS.forEach(key => {
      const value = resp.headers.get(key)
      if (value) {
        headers[key] = value
      }
    })
    return { content, headers }
  } else {
    return null
  }
}
