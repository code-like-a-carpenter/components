/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {SectionHeading, Section} from '..';

import {Card} from './card';

describe('Card', () => {
  it('is a section', () => {
    // we're wrapping it in a second section so that "foo" ends up in an h2,
    // proving that there are two sections in play rather than just doing
    // SectionHeading's default thing.
    const {container} = render(
      <Section>
        <Card>
          <SectionHeading>foo</SectionHeading>
        </Card>
      </Section>
    );
    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('foo')).toBe(container.querySelector('h2'));
  });

  it('wraps body in a second section when a header is provided', () => {
    const {container} = render(
      <Card>
        <Card.Header>foo</Card.Header>
        <Card.Body>
          <SectionHeading>bar</SectionHeading>
        </Card.Body>
      </Card>
    );
    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('foo')).toBe(container.querySelector('h1'));

    expect(screen.getByText('bar')).toBeInTheDocument();
    expect(screen.getByText('bar')).toBe(container.querySelector('h2'));
  });
});

describe('Card.Header', () => {
  it('is automatically a heading', () => {
    const {container} = render(
      <Card>
        <Card.Header>foo</Card.Header>
        <Card.Body>
          <SectionHeading>bar</SectionHeading>
        </Card.Body>
      </Card>
    );
    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('foo')).toBe(container.querySelector('h1'));
  });
});
