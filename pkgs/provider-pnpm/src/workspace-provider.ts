import { type WorkspacePackage, WorkspaceProvider, pickObject } from '@lansa/core';
import { findWorkspaceDir } from '@pnpm/find-workspace-dir';
import { findWorkspacePackages } from '@pnpm/workspace.find-packages';
import { readWorkspaceManifest } from '@pnpm/workspace.read-manifest';

export class PnpmWorkspaceProvider extends WorkspaceProvider {
  override async getPackages(cwd: string): Promise<WorkspacePackage[]> {
    const root = await findWorkspaceDir(cwd);

    if (!root) {
      throw new Error('Not in a pnpm workspace');
    }

    const manifest = await readWorkspaceManifest(root);

    if (!manifest) {
      throw new Error('Could not find valid pnpm-workspace.yaml');
    }

    let packages = await findWorkspacePackages(root, {
      patterns: manifest.packages
    });

    // Ensures all packages have a name and version
    packages = packages.filter((p) => p.manifest.name && p.manifest.version);

    const ownPkgNames = new Set(packages.map((p) => p.manifest.name!));
    return packages.map((p) => ({
      name: p.manifest.name!,
      version: p.manifest.version!,
      provider: this.constructor.name,
      workspaceDependencies: p.manifest.dependencies
        ? pickObject(p.manifest.dependencies, ownPkgNames)
        : {},
      manifest: p.manifest
    }));
  }

  override filterPublishable(packages: WorkspacePackage[]): WorkspacePackage[] {
    return super
      .filterPublishable(packages)
      .filter((p) => p.provider !== this.constructor.name || p.manifest?.private !== true);
  }
}
