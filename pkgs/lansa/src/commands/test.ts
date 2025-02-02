import { readConfig } from '@lansa/config';
import { ManyWorkspaceProvider } from '@lansa/core';
import { Command } from '@oclif/core';

export default class Test extends Command {
  override async run() {
    const cwd = process.cwd();
    const config = await readConfig(cwd);
    const many = new ManyWorkspaceProvider(config);
    const packages = await many.getPackages(cwd);
    const publishable = many.filterPublishable(packages);

    console.log(publishable);
  }
}
