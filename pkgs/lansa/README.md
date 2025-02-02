 Usage

<!-- usage -->
```sh-session
$ npm install -g lansa
$ lansa COMMAND
running command...
$ lansa (--version)
lansa/1.0.0 linux-x64 node-v20.15.1
$ lansa --help [COMMAND]
USAGE
  $ lansa COMMAND
...
```
<!-- usagestop -->

<br />

# Commands

<!-- commands -->
* [`lansa autocomplete [SHELL]`](#lansa-autocomplete-shell)
* [`lansa help [COMMAND]`](#lansa-help-command)
* [`lansa test`](#lansa-test)

## `lansa autocomplete [SHELL]`

Display autocomplete installation instructions.

```
USAGE
  $ lansa autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  (zsh|bash|powershell) Shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  Display autocomplete installation instructions.

EXAMPLES
  $ lansa autocomplete

  $ lansa autocomplete bash

  $ lansa autocomplete zsh

  $ lansa autocomplete powershell

  $ lansa autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v3.2.20/src/commands/autocomplete/index.ts)_

## `lansa help [COMMAND]`

Display help for lansa.

```
USAGE
  $ lansa help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for lansa.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.24/src/commands/help.ts)_

## `lansa test`

```
USAGE
  $ lansa test
```

_See code: [src/commands/test.ts](https://github.com/arthurfiorette/lansa/blob/v1.0.0/src/commands/test.ts)_
<!-- commandsstop -->

<br />
