export interface NavLink {
  path: string;
  title: string;
}

export type NavLinkObject = Record<string, NavLink>;
