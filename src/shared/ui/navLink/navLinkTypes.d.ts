export interface INavLink {
    path: string;
    title: string;
}

export interface INavLinkObject {
    [index: string]: INavLink;
}
