export interface Params {
  username: string
  repo: string
  version: string
  name: string
}

export async function fetchGithubRelease(params: Params, suffix: 'css' | 'js') {
  const url = `https://github.com/${params.username}/${params.repo}/releases/download/${params.version}/${params.name}.${suffix}`
  const resp = await fetch(url)
  if (resp.status === 200) {
    return resp.text()
  } else {
    return null
  }
}
