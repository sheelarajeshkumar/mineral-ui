/* @flow */
import React from 'react';
import ButtonGroup from '../../../../library/ButtonGroup';

export default [
  {
    type: 'do',
    description: 'TODO',
    example: (
      <ButtonGroup
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        defaultChecked="quartz"
        name="mineral"
      />
    )
  }
];
