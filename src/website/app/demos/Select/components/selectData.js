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
import IconCloud from 'mineral-ui-icons/IconCloud';

import type { Items, ItemGroups } from '../../../../../Menu/Menu';
import type { Item } from '../../../../../Menu/MenuItem';

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

export const statesData: Items = Object.entries(states).reduce((acc, entry) => {
  // $FlowFixMe
  const item: Item = {
    text: entry[1],
    value: entry[0]
  };
  acc.push(item);
  return acc;
}, []);

export const basicData: Items = [
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

export const groupedData: ItemGroups = [
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

export const iconsData: Items = [
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

export const rtlData: Items = [
  {
    text: 'ألفا',
    value: 'alpha'
  },
  {
    text: 'بيتا',
    value: 'beta'
  },
  {
    text: 'غاما',
    value: 'gamma'
  }
];
