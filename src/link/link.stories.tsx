import {Alert, Card} from '..';

import {Link} from './link';

export default {
  component: Link,
  title: 'Components/Link',
};

export const link = () => (
  <>
    A <Link href="#">Link</Link>
  </>
);

export const inAnAlert = () => (
  <Alert variant="primary">
    A <Link href="#">Link</Link> in an Alert
  </Alert>
);

export const inACard = () => (
  <Card>
    <Card.Body>
      A <Link href="#">Link</Link> in an Alert
    </Card.Body>
  </Card>
);
