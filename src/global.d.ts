declare module "*.css";
declare module "*.sass" {
    const content: {[className: string]: string};
    export default content;
};