declare module "react-cookies" {
  interface CookieAttributes {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
  }

  const cookie: {
    save(name: string, value: any, options?: CookieAttributes): void;
    load(name: string): any;
    remove(name: string, options?: CookieAttributes): void;
  };

  export default cookie;
}
