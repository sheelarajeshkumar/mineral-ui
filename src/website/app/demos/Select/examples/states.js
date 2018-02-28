/**
 * Copyright 2017 CA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */
import React from 'react';
import { simulate } from 'glamor';
import { createStyledComponent } from '../../../../../styles';
import DemoLayout from '../components/DemoLayout';
import { FormFieldset } from '../../../../../Form';
import Select from '../../../../../Select';
import { basicData as data } from '../components/selectData';

const FieldSetRoot = createStyledComponent(FormFieldset, {
  '& > *': {
    marginBottom: '0.5rem',
    marginRight: '0.5rem'
  }
});

function FieldSet(props: {
  legend: string,
  variant?: 'success' | 'warning' | 'danger'
}) {
  const { legend, variant } = props;
  const selectProps = {
    data,
    variant
  };

  return (
    <FieldSetRoot>
      <legend>{legend}</legend>
      <Select placeholder="Regular" {...selectProps} />
      <Select {...simulate('hover')} placeholder="Hover" {...selectProps} />
      <Select {...simulate('focus')} placeholder="Focus" {...selectProps} />
      <Select
        {...simulate('focus', 'hover')}
        placeholder="Focus & Hover"
        {...selectProps}
      />
      <Select
        {...simulate('focus', 'active')}
        placeholder="Focus & Active"
        {...selectProps}
      />
      <Select {...simulate('active')} placeholder="Active" {...selectProps} />
      <Select readOnly placeholder="Read Only" {...selectProps} />
      <Select disabled placeholder="Disabled" {...selectProps} />
    </FieldSetRoot>
  );
}

export default {
  id: 'states',
  title: 'States',
  description: `<Callout title="Note">
  <p key={0}>
    Much of this example is currently broken, due to
    the <code key={0}>simulate()</code> prop not being passed down to the
    ultimate element with styles dependent on state. We hope the switch to
    render props will enable a fix.
  </p>
</Callout>`,
  hideFromProd: true,
  hideSource: true,
  scope: { DemoLayout, FieldSet },
  source: `
    <DemoLayout>
      <FieldSet legend="Regular" />
      <FieldSet legend="Success" variant="success" />
      <FieldSet legend="Warning" variant="warning" />
      <FieldSet legend="Danger" variant="danger" />
    </DemoLayout>
  `
};
