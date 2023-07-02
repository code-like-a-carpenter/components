import type {Meta} from '@storybook/react';
import {Button, ListGroup} from 'react-bootstrap';

import {Link} from '../link';

import {Card} from './card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Components/Card',
};

export default meta;

export const Default = () => (
  <Card titleSlot="Card Title">
    <p>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </p>
    <Button variant="primary">Go somewhere</Button>
  </Card>
);

export const Body = () => (
  <Card titleSlot="Card Title">
    <p>This is some text within a card body.</p>
    <p>This is a p-tag with no classes</p>
    <p className="card-text">This is a p-tag with the card-text class</p>
    <div className="card-text">
      <p>This is a p-tag within a div with the card-text class</p>
    </div>
  </Card>
);

export const TitlesTextAndLinks = () => (
  <Card titleSlot="Card Title" subtitleSlot="Card Subtitle">
    <p>
      Some quick example text to build on the card title and make up the bulk of
      the card&apos;s content
    </p>
    <Link href="#">Card link</Link>
    <Link href="#">Another link</Link>
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
  <Card headerSlot="Featured">
    <ListGroup variant="flush">
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
    </ListGroup>
  </Card>
);

export const Header = () => (
  <Card headerSlot="Featured" titleSlot="Special title treatment">
    <p>
      With supporting text below as a natural lead-in to additional content.
    </p>
    <Button href="#">Go somewhere</Button>
  </Card>
);

export const KitchenSink = () => (
  <Card
    headerSlot="Card Header"
    titleSlot="Card title"
    subtitleSlot="Card subtitle"
  >
    <p>
      Some quick example text to build on the card title and make up the bulk of
      the card&apos;s content
    </p>
    <ListGroup variant="flush">
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
    <Link href="#">Card Link</Link>
    <Link href="#">Another Link</Link>
  </Card>
);
