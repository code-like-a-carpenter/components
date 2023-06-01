import {Code} from './code';

export default {
  component: Code,
  title: 'Components/Code',
};

export const Default = () => (
  <Code>
    {`{
        "proof": true
      }`}
  </Code>
);

export const Inline = () => (
  <p>
    There is <Code inline>inline code</Code> in this paragraph
  </p>
);

/**
 * Sometimes the component hierarchy can acceidentally nest a code block within
 * a code block. `<Code/>` takes care of that by ensuring not more than one
 * `<pre><code></code></pre>` happens.
 */
export const Nested = () => (
  <Code>
    <Code>foo</Code>
  </Code>
);

/**
 * Sometimes the component hierarchy can accidentally nest a code block within
 * a code block. `<Code/>` takes care of that by ensuring not more than one
 * `<pre><code></code></pre>` happens.
 */
export const Indented = () => (
  <Code>{`
  {
    "proof": true
  }
  `}</Code>
);
