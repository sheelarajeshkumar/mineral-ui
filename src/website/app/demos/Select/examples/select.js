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
import DemoLayout from '../components/DemoLayout';
import { FormField, FormFieldDivider, FormFieldset } from '../../../../../Form';
import IconCloud from 'mineral-ui-icons/IconCloud';
import Button from '../../../../../Button';
import Select from '../../../../../Select';

const states = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming'
};

export const stateData = Object.entries(states).reduce((acc, entry) => {
  const item = {
    text: entry[1],
    value: entry[0]
  };
  acc.push(item);
  return acc;
}, []);

const data = [
  {
    text: 'Alpha',
    value: 'alpha'
  },
  {
    text: 'Beta',
    value: 'beta'
  },
  {
    text: 'Gamma',
    value: 'gamma'
  }
];

const groupedData = [
  {
    title: 'Group One',
    items: [
      {
        text: 'Alpha',
        value: 'alpha'
      },
      {
        text: 'Beta',
        value: 'beta'
      },
      {
        text: 'Gamma',
        value: 'gamma'
      }
    ]
  },
  {
    title: 'Group Two',
    items: [
      {
        text: 'Delta',
        value: 'delta'
      },
      {
        text: 'Epsilon',
        value: 'epsilon'
      },
      {
        text: 'Zeta',
        value: 'zeta'
      }
    ]
  }
];

const iconData = [
  {
    iconStart: <IconCloud />,
    text: 'Alpha',
    value: 'alpha'
  },
  {
    iconStart: <IconCloud />,
    text: 'Beta',
    value: 'beta'
  },
  {
    iconStart: <IconCloud />,
    text: 'Gamma',
    value: 'gamma'
  }
];

export default {
  id: 'basic',
  title: 'Basic Usage',
  description: ``,
  scope: {
    Button,
    data,
    DemoLayout,
    FormField,
    FormFieldDivider,
    FormFieldset,
    groupedData,
    iconData,
    Select,
    stateData
  },
  source: `
  <DemoLayout>
    <Select data={data} />
    <FormFieldset legend="Basic">
      <Select data={data} />
      <Select data={stateData} />
    </FormFieldset>

    <FormFieldset legend="Grouped data">
      <Select data={groupedData} />
    </FormFieldset>

    <FormFieldset legend="Items with icons">
      <Select data={iconData} />
    </FormFieldset>

    <FormFieldset legend="Custom item renderer">
      TODO: Render items containg Avatar component
    </FormFieldset>

    <FormFieldset legend="Placeholder">
      <Select data={stateData} placeholder="Choose a state" />
    </FormFieldset>

    <FormFieldset legend="Variants">
      <Select data={data} variant="danger" />
      <Select data={data} variant="success" />
      <Select data={data} variant="warning" />
    </FormFieldset>

    <FormFieldset legend="Defaults">
      <Select data={data} defaultValue="nothing" />
      <Select data={data} defaultValue="nothing" defaultSelectedItem={data[1]} />
      <Select data={data} defaultSelectedItem={data[1]} />
      <Select data={data} defaultIsOpen />
    </FormFieldset>

    <FormFieldset legend="Event handlers">
      <Select data={data} onOpen={(event) => {console.log('onOpen', event)}} />
      <Select data={data} onClose={(event) => {console.log('onClose', event)}} />
      <Select data={data} onSelect={(item, event) => {console.log('onSelect', item, event)}} />
      <Select data={data} onChange={(item, event) => {console.log('onChange', item, event)}} />
    </FormFieldset>

    <FormFieldset legend="Uncontrolled form submission">
      <form>
        <Select data={data} name="test" defaultValue="nothing" />
        <Button type="submit" size="small">Submit</Button>
      </form>
    </FormFieldset>

    <FormFieldset legend="FormField">
      <FormField
        input={Select}
        data={stateData}
        placeholder="Choose a state"
        label="State"
        caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        name="state"
        required />
    </FormFieldset>

    <FormFieldset legend="Controlled props">
      <Select data={data} isOpen />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </FormFieldset>
  </DemoLayout>`
};
