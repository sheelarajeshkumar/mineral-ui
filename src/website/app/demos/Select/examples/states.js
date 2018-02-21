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
import { simulate } from 'glamor';
import Select from '../../../../../Select';
import { stateData as data } from './select';
import DemoLayout from '../components/DemoLayout';

export default {
  id: 'states',
  title: 'States',
  description: ``,
  hideFromProd: true,
  hideSource: true,
  scope: { DemoLayout, Select, simulate, data },
  source: `
  <DemoLayout>
    <Select data={data} />
    <Select data={data} variant="danger" />
    <Select data={data} variant="success" />
    <Select data={data} variant="warning" />
    <br /><br />
    <Select data={data} {...simulate('hover')} />
    <Select data={data} variant="danger" {...simulate('hover')} />
    <Select data={data} variant="success" {...simulate('hover')} />
    <Select data={data} variant="warning" {...simulate('hover')} />
    <br /><br />
    <Select data={data} {...simulate('focus')} />
    <Select data={data} variant="danger" {...simulate('focus')} />
    <Select data={data} variant="success" {...simulate('focus')} />
    <Select data={data} variant="warning" {...simulate('focus')} />
    <br /><br />
    <Select data={data} {...simulate('focus', 'hover')} />
    <Select data={data} variant="danger" {...simulate('focus', 'hover')} />
    <Select data={data} variant="success" {...simulate('focus', 'hover')} />
    <Select data={data} variant="warning" {...simulate('focus', 'hover')} />
    <br /><br />
    <Select data={data} {...simulate('focus', 'active')} />
    <Select data={data} variant="danger" {...simulate('focus', 'active')} />
    <Select data={data} variant="success" {...simulate('focus', 'active')} />
    <Select data={data} variant="warning" {...simulate('focus', 'active')} />
    <br /><br />
    <Select data={data} {...simulate('active')} />
    <Select data={data} variant="danger" {...simulate('active')} />
    <Select data={data} variant="success" {...simulate('active')} />
    <Select data={data} variant="warning" {...simulate('active')} />
  </DemoLayout>`
};
