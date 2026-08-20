import type { MarkdownEnv } from 'vitepress'

interface MarkdownRenderer {
  renderAsync(src: string, env: MarkdownEnv): Promise<string>
}

const metaRegex = /<div data-typlog-search-meta data-title="([^"]*)" data-description="([^"]*)"><\/div>/
const headingRegex = /<h(\d*).*?>(.*?<a.*? href="#.*?".*?>.*?<\/a>)<\/h\1>/gi
const headingContentRegex = /(.*)<a.*? href="#(.*?)".*?>.*?<\/a>/i
const descriptionSeparator = '\u0001'

export const searchOptions = {
  _render: async (src: string, env: MarkdownEnv, md: MarkdownRenderer) => {
    const html = await md.renderAsync(src, env)
    if (env.frontmatter?.search === false) return ''

    const title = typeof env.frontmatter?.title === 'string'
      ? env.frontmatter.title
      : ''
    const description = typeof env.frontmatter?.description === 'string'
      ? env.frontmatter.description
      : ''

    return `<div data-typlog-search-meta data-title="${encodeURIComponent(title)}" data-description="${encodeURIComponent(description)}"></div>${html}`
  },
  miniSearch: {
    options: {
      storeFields: ['title', 'titles', 'text'],
    },
    _splitIntoSections(_path: string, html: string) {
      const meta = metaRegex.exec(html)
      const title = decodeURIComponent(meta?.[1] || '')
      const description = decodeURIComponent(meta?.[2] || '')
      const content = html.replace(metaRegex, '')
      const result = content.split(headingRegex)
      const preamble = getSearchableText(result.shift() || '')
      const pageTitle = title || getFirstHeadingTitle(result) || 'Documentation'
      const sections: Array<{ anchor: string; titles: string[]; text: string }> = []

      sections.push({
        anchor: '',
        titles: [pageTitle],
        text: withDescription(description, preamble),
      })

      let parentTitles: string[] = [pageTitle]
      for (let index = 0; index < result.length; index += 3) {
        const level = Number.parseInt(result[index]) - 1
        const heading = result[index + 1]
        const headingResult = headingContentRegex.exec(heading)
        const sectionTitle = getSearchableText(headingResult?.[1] || '').trim()
        const anchor = headingResult?.[2] || ''
        const sectionText = getSearchableText(result[index + 2] || '')
        const titles = parentTitles.slice(0, level)
        titles[level] = sectionTitle
        parentTitles = titles.filter(Boolean)
        if (!sectionTitle || !sectionText) continue

        sections.push({
          anchor,
          titles: parentTitles,
          text: withDescription(description, sectionText),
        })
      }

      return sections
    },
  },
}

function getFirstHeadingTitle(parts: string[]) {
  const heading = parts[1]
  const headingResult = headingContentRegex.exec(heading || '')
  return getSearchableText(headingResult?.[1] || '').trim()
}

function withDescription(description: string, text: string) {
  return description
    ? `${description}${descriptionSeparator}${text}`
    : text
}

function getSearchableText(content: string) {
  return content.replace(/<[^>]*>/g, '').trim()
}
