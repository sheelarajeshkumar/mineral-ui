/* @flow */
import React, { Component } from 'react';
import createReactContext, { type Context } from 'create-react-context';
import { createStyledComponent } from '../styles';
import { createThemedComponent, mapComponentThemes } from '../themes';
import { generateId } from '../utils';
import DataRow from './DataRow';
import HeaderRow from './HeaderRow';
import _OverflowContainer, {
  componentTheme as overflowContainerComponentTheme
} from './OverflowContainer';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableTitle from './TableTitle';

import type { Selectable } from './Selectable';
import type { Sort, SortFn } from './Sortable';
import type { Columns, Messages, Rows } from './Table';

// See Table
type Props = {
  columns: Columns,
  data: Rows,
  hideHeader?: boolean,
  hideTitle?: boolean,
  id?: string,
  messages: Messages,
  rowKey?: string,
  scrollable?: boolean,
  selectable?: Selectable,
  sort?: Sort,
  sortable?: boolean,
  sortFn?: SortFn,
  title: React$Node,
  titleAppearance?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  titleElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} & Appearance;

type State = {
  scrollable: boolean
};

type Appearance = {
  density?: 'default' | 'spacious',
  highContrast?: boolean,
  striped?: boolean
};

export const componentTheme = (baseTheme: Object) =>
  mapComponentThemes(
    {
      name: 'OverflowContainer',
      theme: overflowContainerComponentTheme(baseTheme)
    },
    {
      name: 'Table',
      theme: {}
    },
    baseTheme
  );

const OverflowContainer = createThemedComponent(
  _OverflowContainer,
  ({ theme: baseTheme }) =>
    mapComponentThemes(
      {
        name: 'Table',
        theme: componentTheme(baseTheme)
      },
      {
        name: 'OverflowContainer',
        theme: {}
      },
      baseTheme
    )
);

const Root = createStyledComponent(
  'table',
  {
    borderCollapse: 'collapse',
    borderSpacing: 0,
    width: '100%'
  },
  {
    displayName: 'Table',
    rootEl: 'table',
    includeStyleReset: true
  }
);

export const TableContext: Context<Appearance> = createReactContext({});

/**
 * Table displays structured data with columns and rows.
 */
export default class TableBase extends Component<Props, State> {
  static defaultProps = {
    titleElement: 'h4',
    density: 'default',
    scrollable: true
  };

  id: string = this.props.id || `table-${generateId()}`;

  titleId: string = `${this.id}-title`;

  render() {
    console.log('render TableBase');
    const {
      columns,
      data,
      density,
      sortable,
      hideHeader,
      hideTitle,
      highContrast,
      messages,
      rowKey,
      scrollable,
      selectable,
      sort,
      sortFn,
      striped,
      title,
      titleAppearance,
      titleElement,
      ...rootProps
    } = this.props;
    const appearanceProps = {
      density,
      highContrast,
      striped
    };
    const headerProps = {
      checked: selectable && selectable.all,
      columns,
      sortable,
      indeterminate: selectable && selectable.some,
      messages,
      sort,
      sortFn,
      toggle: selectable && selectable.toggleAll
    };

    let table = (
      <TableContext.Provider value={appearanceProps}>
        <Root {...rootProps}>
          <TableTitle
            appearance={titleAppearance}
            element={titleElement}
            hide={hideTitle}
            id={this.titleId}>
            {title}
          </TableTitle>
          <TableHeader hide={hideHeader}>
            <HeaderRow {...headerProps} />
          </TableHeader>
          <TableBody>
            {data.map((rowData, index) => {
              const rowProps = {
                checked: selectable && selectable.isSelected(rowData),
                columns,
                data: rowData,
                toggleItem: selectable && selectable.toggleItem
              };
              return <DataRow key={rowData[rowKey] || index} {...rowProps} />;
            })}
          </TableBody>
        </Root>
      </TableContext.Provider>
    );

    if (scrollable) {
      const containerProps = {
        'aria-labelledby': this.titleId,
        role: 'group'
      };
      table = (
        <OverflowContainer {...containerProps}>{table}</OverflowContainer>
      );
    }

    return table;
  }
}
