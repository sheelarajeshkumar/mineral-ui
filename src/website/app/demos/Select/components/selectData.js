import React from 'react';
import IconCloud from 'mineral-ui-icons/IconCloud';

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

export const statesData = Object.entries(states).reduce((acc, entry) => {
  const item = {
    text: entry[1],
    value: entry[0]
  };
  acc.push(item);
  return acc;
}, []);

export const basicData = [
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

export const groupedData = [
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

export const iconsData = [
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
