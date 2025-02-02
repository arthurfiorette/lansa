export interface WorkspacePackage {
  /**
   * The provider that found this package.
   */
  provider: string;

  /**
   * The name of the package.
   */
  name: string;

  /**
   * A semver version.
   */
  version: string;

  /**
   * A record containing only dependencies that are part of the workspace.
   */
  workspaceDependencies: Record<string, string>;

  /**
   * The original package manifest file contents as an object. Like `package.json`.
   */
  manifest?: any;
}
