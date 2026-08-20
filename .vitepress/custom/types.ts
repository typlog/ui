import type { DefaultTheme } from 'vitepress'

export interface SidebarItem extends Omit<DefaultTheme.SidebarItem, 'items'> {
  icon?: string
  items?: SidebarItem[]
}

export interface NavChildItem extends Omit<DefaultTheme.NavItemWithLink, 'items' | 'link'> {
  link: string
  icon?: string,
  description?: string,
}

export interface NavItem extends Omit<DefaultTheme.NavItemWithLink, 'items' | 'link'> {
  link?: string
  items?: NavChildItem[]
}

export interface ThemeConfig extends Omit<DefaultTheme.Config, 'sidebar' | 'nav'> {
  nav?: NavItem[]
  sidebar: SidebarItem[]
}

export interface NavSidebarItem extends SidebarItem {
  text: string
  link: string
  active: boolean
}
