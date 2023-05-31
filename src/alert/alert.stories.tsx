import {Code, Link, SectionHeading} from '..';

import {Alert} from '.';

export default {
  component: Alert,
  title: 'Components/Alert',
};

export const alert = () => <Alert>A simple alert</Alert>;

export const primary = () => (
  <Alert variant="primary">
    A <Code inline>primary</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);
export const secondary = () => (
  <Alert variant="secondary">
    A <Code inline>secondary</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);

export const success = () => (
  <Alert variant="success">
    A <Code inline>success</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);

export const danger = () => (
  <Alert variant="danger">
    A <Code inline>danger</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);

export const warning = () => (
  <Alert variant="warning">
    A <Code inline>warning</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);

export const info = () => (
  <Alert variant="info">
    A <Code inline>info</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);

export const dark = () => (
  <Alert variant="dark">
    A <Code inline>dark</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);

export const light = () => (
  <Alert variant="light">
    A <Code inline>light</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);

export const withAdditionalContent = () => (
  <Alert variant="success">
    <SectionHeading>Hey, nice to see you</SectionHeading>
    <p>
      Aww yeah, you successfully read this important alert message. This example
      text is going to run a bit longer so that you can see how spacing within
      an alert works with this kind of content.
    </p>
    <hr />
    <p className="mb-0">
      Whenever you need to, be sure to use margin utilities to keep things nice
      and tidy.
    </p>
  </Alert>
);
