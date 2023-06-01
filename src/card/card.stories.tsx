import {Button, ListGroup} from 'react-bootstrap';

import {Link} from '..';

import {Card} from './card';

export default {
  component: Card,
  title: 'Components/Card',
};

export const Default = () => (
  <Card>
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card&apos;s content
      </Card.Text>
      <Button href="#" variant="primary">
        Go somewhere
      </Button>
    </Card.Body>
  </Card>
);

export const Body = () => (
  <Card body>
    <Card.Title>Card title</Card.Title>
    <Card.Text>This is some text within a card body.</Card.Text>
    <p>This is a p-tag with no classes</p>
    <p className="card-text">This is a p-tag with the card-text class</p>
    <div className="card-text">
      <p>This is a p-tag with in a div with the card-text class</p>
    </div>
  </Card>
);

export const TilesTextAndLinks = () => (
  <Card>
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Subtitle>Card subtitle</Card.Subtitle>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card&apos;s content
      </Card.Text>
      <Link href="#">Card link</Link>
      <Link href="#">Another link</Link>
    </Card.Body>
  </Card>
);

export const ListGroups = () => (
  <Card>
    <ListGroup variant="flush">
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
    </ListGroup>
  </Card>
);

export const ListGroupsWithHeading = () => (
  <Card>
    <Card.Header>Featured</Card.Header>
    <ListGroup variant="flush">
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
    </ListGroup>
  </Card>
);

export const Header = () => (
  <Card>
    <Card.Header>Featured</Card.Header>
    <Card.Body>
      <Card.Title>Special title treatment</Card.Title>
      <Card.Text>
        With supporting text below as a natural lead-in to additional content.
      </Card.Text>
      <Button href="#">Go somewhere</Button>
    </Card.Body>
  </Card>
);

export const KitchenSink = () => (
  <Card>
    <Card.Header>Card Header</Card.Header>
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Subtitle>Card subtitle</Card.Subtitle>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card&apos;s content
      </Card.Text>
    </Card.Body>
    <ListGroup variant="flush">
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
    <Card.Body>
      <Link href="#">Card Link</Link>
      <Link href="#">Another Link</Link>
    </Card.Body>
  </Card>
);
