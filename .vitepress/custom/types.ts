import type { DefaultTheme } from 'vitepress'

export interface SidebarItem extends DefaultTheme.SidebarItem {
  icon?: string
  items?: SidebarItem[]
}

export interface ThemeConfig extends Omit<DefaultTheme.Config, 'sidebar'> {
  sidebar: SidebarItem[]
}

export interface NavSidebarItem extends SidebarItem {
  text: string
  link: string
  active: boolean
}
