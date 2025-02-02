import type { Promisable } from 'type-fest';

export interface WorkspacePackage {
  name: string;
  version: string;
  dependencies: Record<string, string>;
}

export interface WorkspaceProvider {
  /**
   * Returns the root path of the workspace or null if not in a workspace.
   */
  getWorkspaceRoot(): Promisable<string | null>;

  /**
   * Returns the packages in the workspace.
   */
  getPackages(): Promisable<WorkspacePackage[]>;
}
