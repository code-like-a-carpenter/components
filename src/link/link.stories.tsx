import {Alert, Card} from '..';

import {Link} from './link';

export default {
  component: Link,
  title: 'Components/Link',
};

export const Default = () => (
  <>
    A <Link href="#">Link</Link>
  </>
);

export const InAnAlert = () => (
  <Alert variant="primary">
    A <Link href="#">Link</Link> in an Alert
  </Alert>
);

export const InACard = () => (
  <Card>
    <Card.Body>
      A <Link href="#">Link</Link> in an Alert
    </Card.Body>
  </Card>
);
