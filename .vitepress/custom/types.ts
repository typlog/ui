import type { DefaultTheme } from "vitepress"

export interface SidebarItem extends DefaultTheme.SidebarItem {
  icon?: string
}

interface SidebarMulti {
  [path: string]: SidebarItem[] | { items: SidebarItem[]; base: string }
}

export interface ThemeConfig extends Omit<DefaultTheme.Config, 'sidebar'> {
  sidebar: SidebarItem[] | SidebarMulti
}
