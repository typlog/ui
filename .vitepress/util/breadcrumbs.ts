type NavItem = {
  text: string;
  link?: string;
  items?: NavItem[];
};

type Breadcrumb = { text: string }[];

/**
 * Finds the breadcrumb path to a given link within the navigation data.
 * @param navItems The full nested navigation structure.
 * @param link The target link to search for.
 * @returns An array of breadcrumb items.
 */
function findBreadcrumbPath(navItems: NavItem[], link: string): Breadcrumb {
  function dfs(items: NavItem[], path: Breadcrumb): Breadcrumb | null {
    for (const item of items) {
      const newPath = [...path, { text: item.text }]

      if (item.link === link) {
        return newPath
      }

      if (item.items) {
        const result = dfs(item.items, newPath)
        if (result) return result
      }
    }

    return null
  }

  return dfs(navItems, []) ?? []
}
