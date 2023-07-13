declare module '*.svg' {
    const content: React.FC<React.SVGProps<SVGElement>>;
    export default content;
}

/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="@shared/types/svg" />

interface ImportMetaEnv {
    readonly VITE_SERVER_URI: string
}

declare const __SERVER_URI__: string;

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
