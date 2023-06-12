# Components _(@code-like-a-carpenter/components)_

[![license](https://img.shields.io/github/license/code-like-a-carpenter/components.svg)](https://github.com/code-like-a-carpenter/components/blob/master/LICENSE)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![npm (scoped)](https://img.shields.io/npm/v/@code-like-a-carpenter/components.svg)](https://www.npmjs.com/package/@code-like-a-carpenter/components)
[![npm](https://img.shields.io/npm/dm/@code-like-a-carpenter/components.svg)](https://www.npmjs.com/package/@code-like-a-carpenter/components)
[![Dependabot badge](https://img.shields.io/badge/Dependabot-active-brightgreen.svg)](https://dependabot.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> A collection of components I can use accross projects

This is not a styleguide and this is not a design system. I've been finding I
keep writing the same components across many projects (Button, Card, Alert,
etc). While each of these components should be styled according to its project,
I shouldn't need to write the typescript more than once. This project serves to
unify the typescript design of my UI components across many projects.

## Table of Contents

<!-- toc -->

-   [Install](#install)
-   [Usage](#usage)
-   [Maintainer](#maintainer)
-   [Contribute](#contribute)
-   [License](#license)

<!-- tocstop -->

## Install

```bash
npm install @code-like-a-carpenter/components
```

### Dependencies

This project assumes you're using Bootstrap 5.3 or later. While it _does_ have a
dependency as such, depending on how you're importing Bootstrap, you may or may
not get the right version if you've separate installed it.

You _must_ import Bootstrap in a way that's compatible with your build process;
due to all the different ways you may have chosen to bundle styles, this library
cannot import Bootstrap for you.

## Usage

> See [storybook](https://master--5f6f88dd0d66390022e01139.chromatic.com) for
> full documentation

Import the components into your project.

```ts
import {Card} from '@code-like-a-carpenter/components';
```

### Styles

Import the styles into your project. `package.json` contains keys for both
`sass` and `css`.

For higher-level tools, you should be able to import this module directly:

```sass
@import '@code-like-a-carpenter/components'
```

If you're using the `sass` CLI, there are a few quirks that might make importing
a bit more difficult. First, the CLI doesn't deal with node modules, so you'll
need to specify both `--load-path node_modules` as well as the full path to the
file to import. You'll also need to import the sass source rather than the built
css because `@import` does not inline files ending in `.css` (it assume those
should be imported as a css import at runtime rather than a sass import at
compile time).

```sass
@import '@code-like-a-carpenter/components/src/style.scss'
```

Note that you'll separately need to import bootstrap styles using whatever
technique makes the most sense for your build process. There are many ways to
customize Bootstrap, too numerous to discuss here.

#### Customizing Styles

This library only recently started export styles and so they'll likely evolve.
Styles are still considered unstable so breaking changes _will not_ constitute a
major version bump.

Originally, the plan had been to avoid exporting styles at all and leave styling
to the consumer. Unfortunately, even simple components often needs some set of
styles to reach their baseline functionality.

As styles evolve, expect the following:

-   You'll use CSS variables to control built-in behaviors of components that
    might work one of several ways (i.e., if you find you need to add or remove
    class names from a component dynamically, that's probably a bug)
-   For behaviors that can't yet be controlled by CSS variables (because
    container style queries aren't a thing yet), the component will accept props
    that add/remove class names for you.
-   You'll override classes in your stylesheets to customize aesthetics.
-   Components will leverage Bootstrap variables whenever possible and so should
    update with the rest of your theme.

## Maintainer

[Ian Remmel](https://github.com/ianwremmel)

## Contribute

PRs Welcome

## License

[MIT](LICENSE) &copy; [Ian Remmel, LLC](https://github.com/ianwremmel) 2020
until at least now
