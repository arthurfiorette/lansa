import type { LansaConfig } from '@lansa/config';
import type { WorkspacePackage } from '../types';
import { WorkspaceProvider } from './provider';

/**
 * A workspace provider that uses many different providers to get the workspace packages.
 */
export class ManyWorkspaceProvider extends WorkspaceProvider {
  readonly #providers: WorkspaceProvider[] = [];

  constructor(config: LansaConfig) {
    super(config);

    for (const provider of config.workspace.providers) {
      const pkg = require(provider);

      for (const exported of Object.values(pkg)) {
        if (isSubclassOf(exported, WorkspaceProvider)) {
          this.#providers.push(new exported(config));
        }
      }
    }
  }

  async getPackages(cwd: string): Promise<WorkspacePackage[]> {
    const results = await Promise.all(this.#providers.map((provider) => provider.getPackages(cwd)));

    return results.flat(1);
  }

  override filterPublishable(packages: WorkspacePackage[]): WorkspacePackage[] {
    for (const provider of this.#providers) {
      packages = provider.filterPublishable(packages);
    }

    return packages;
  }
}

function isSubclassOf<T extends abstract new (...args: any) => any>(
  sub: unknown,
  sup: T
): sub is { new (config: LansaConfig): InstanceType<T> } {
  let current = sub;
  while (current) {
    if (current === sup) return true;
    current = Object.getPrototypeOf(current);
  }
  return false;
}
