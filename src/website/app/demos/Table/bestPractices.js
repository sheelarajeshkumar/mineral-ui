/* @flow */
import React from 'react';
import Table from '../../../../library/Table';

export default [
  {
    type: 'do',
    description: `Align numerical content (currency, numerical dates, etc...) to
the end (right for LTR languages) for ease of comparison.`,
    example: (
      <Table
        data={[
          { product: 'Product 1', price: '$123.45' },
          { product: 'Product 2', price: '$98.76' }
        ]}
        columns={[
          { name: 'product', content: 'Product' },
          { name: 'price', content: 'Price', textAlign: 'end' }
        ]}
      />
    )
  },
  {
    type: 'dont',
    description: `Avoid displaying your own title for Table. Instead, use the
\`title*\` prop(s) to display an accessibly-connected title with the desired
element and appearance.`,
    example: (
      <div>
        <h4>Non-accessible Title</h4>
        <Table
          data={[
            { product: 'Product 1', price: '$123.45' },
            { product: 'Product 2', price: '$98.76' }
          ]}
          columns={[
            { name: 'product', content: 'Product' },
            { name: 'price', content: 'Price', textAlign: 'end' }
          ]}
        />
      </div>
    )
  },
  {
    type: 'do',
    description: `Designate a column as \`primary\` in your column definitions,
unless your data has no column to serve that purpose.`,
    example: (
      <Table
        data={[
          { product: 'Product 1', price: '$123.45' },
          { product: 'Product 2', price: '$98.76' }
        ]}
        columns={[
          { name: 'product', content: 'Product', primary: true },
          { name: 'price', content: 'Price', textAlign: 'end' }
        ]}
      />
    )
  }
];
