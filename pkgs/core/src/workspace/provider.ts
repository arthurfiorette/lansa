import type { LansaConfig } from '@lansa/config';
import micromatch from 'micromatch';
import type { Promisable } from 'type-fest';
import type { WorkspacePackage } from '../types';

export abstract class WorkspaceProvider {
  constructor(readonly config: LansaConfig) {}

  /**
   * Returns the packages in the workspace.
   */
  abstract getPackages(cwd: string): Promisable<WorkspacePackage[]>;

  /**
   * Returns only publishable packages.
   */
  filterPublishable(packages: WorkspacePackage[]) {
    const names = this.config.workspace.publishable?.names;
    const paths = this.config.workspace.publishable?.paths;

    // nothing to filter
    if (!names && !paths) {
      return packages;
    }

    return packages.filter((p) => {
      if (names) {
        return micromatch.isMatch(p.name, names);
      }

      if (paths) {
        return micromatch.isMatch(p.name, paths);
      }

      return true;
    });
  }
}
