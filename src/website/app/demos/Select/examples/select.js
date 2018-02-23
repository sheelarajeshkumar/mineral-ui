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
import DemoLayout from '../components/DemoLayout';
import { FormField, FormFieldDivider, FormFieldset } from '../../../../../Form';
import Button from '../../../../../Button';
import Select from '../../../../../Select';
import {
  basicData,
  groupedData,
  iconsData,
  statesData
} from '../components/selectData';

export default {
  id: 'basic',
  title: 'Basic Usage',
  description: ``,
  scope: {
    Button,
    basicData,
    iconsData,
    groupedData,
    statesData,
    DemoLayout,
    FormField,
    FormFieldDivider,
    FormFieldset,
    Select
  },
  source: `
  <DemoLayout>
    <FormFieldset legend="Basic">
      <Select data={basicData} />
      <Select data={statesData} />
    </FormFieldset>

    <FormFieldset legend="Grouped data">
      <Select data={groupedData} />
    </FormFieldset>

    <FormFieldset legend="Items with icons">
      <Select data={iconsData} />
    </FormFieldset>

    <FormFieldset legend="Custom item renderer">
      TODO: Render items containg Avatar component
    </FormFieldset>

    <FormFieldset legend="Defaults">
      <Select data={basicData} defaultValue="nothing" />
      <Select data={basicData} defaultValue="nothing" defaultSelectedItem={basicData[1]} />
      <Select data={basicData} defaultSelectedItem={basicData[1]} />
      <Select data={basicData} defaultIsOpen />
    </FormFieldset>

    <FormFieldset legend="Event handlers">
      <Select data={basicData} onOpen={(event) => {console.log('onOpen', event)}} />
      <Select data={basicData} onClose={(event) => {console.log('onClose', event)}} />
      <Select data={basicData} onSelect={(item, event) => {console.log('onSelect', item, event)}} />
      <Select data={basicData} onChange={(item, event) => {console.log('onChange', item, event)}} />
    </FormFieldset>

    <FormFieldset legend="Uncontrolled form submission">
      <form>
        <Select data={basicData} name="test" defaultValue="nothing" />
        <Button type="submit" size="small">Submit</Button>
      </form>
    </FormFieldset>

    <FormFieldset legend="FormField">
      <FormField
        input={Select}
        data={statesData}
        placeholder="Choose a state"
        label="State"
        caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        name="state"
        required />
    </FormFieldset>

    <FormFieldset legend="Controlled props">
      <Select data={basicData} isOpen />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </FormFieldset>
  </DemoLayout>`
};
