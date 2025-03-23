export type SVGComponent = React.FC<React.SVGProps<SVGElement>>;

declare module '*.svg' {
  const content: SVGComponent;
  export default content;
}
