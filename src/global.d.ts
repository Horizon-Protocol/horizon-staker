declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_CHAIN_ID: string;
    readonly REACT_APP_COMMIT_VERSION: string;
  }
}
