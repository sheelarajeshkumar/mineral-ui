/* @flow */
import React from 'react';
import examples from './examples';
import bestPractices from './bestPractices';

const doc = require('!!react-docgen-loader!../../../../library/ButtonGroup/ButtonGroup');

export default [
  {
    bestPractices,
    doc,
    examples,
    propsComment: (
      <p>
        Unlike most other components, which apply undocumented properties to the
        root element, ButtonGroup applies undocumented properties to the{' '}
        <em>Button</em> component.
      </p>
    ),
    slug: 'button-group',
    title: 'ButtonGroup',
    whenHowToUse: `ButtonGroup is used to provide a simpler API for creating a
group of [Buttons](/components/button).  It also provides proper row spacing and an
inline layout option.

Use a ButtonGroup to allow users to select a single option from a list.

Use Buttons when the number of choices is fairly small.  If the number of
choices is large, consider an alternate form control, such as a select, which
has a more compact layout.

Use Buttons to change settings rather than initiate actions.

Use caution when determining a default selection for a group of Buttons.
* If a default is provided, ensure that it does not make assumptions about your
users choices.
* If a default is not provided, be aware that 'no selection' is a state that
users cannot return to once a selection is made.
* Both of these case can generally be addressed by providing a neutral option.
If this is insufficient, consider an alternate form control.

ButtonGroups should be wrapped in a [FormField](/components/form-field) to provide an
accessible label and other features.  See the [FormField example](#form-field)
for details.`
  }
];
