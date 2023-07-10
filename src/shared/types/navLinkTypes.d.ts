export interface INavLink {
    path: string
    title: string
}

export type INavLinkObject = Record<string, INavLink>;
