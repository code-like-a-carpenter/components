import {Code, Link, SectionHeading} from '..';

import {Alert} from '.';

export default {
  component: Alert,
  title: 'Components/Alert',
};

export const Default = () => <Alert>A simple alert</Alert>;

export const Primary = () => (
  <Alert variant="primary">
    A <Code inline>primary</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);
export const Secondary = () => (
  <Alert variant="secondary">
    A <Code inline>secondary</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);

export const Success = () => (
  <Alert variant="success">
    A <Code inline>success</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);

export const Danger = () => (
  <Alert variant="danger">
    A <Code inline>danger</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);

export const Warning = () => (
  <Alert variant="warning">
    A <Code inline>warning</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);

export const Info = () => (
  <Alert variant="info">
    A <Code inline>info</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);

export const Dark = () => (
  <Alert variant="dark">
    A <Code inline>dark</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);

export const Light = () => (
  <Alert variant="light">
    A <Code inline>light</Code> alert with <Link href="#">a link</Link>.
  </Alert>
);

export const WithAdditionalContent = () => (
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
