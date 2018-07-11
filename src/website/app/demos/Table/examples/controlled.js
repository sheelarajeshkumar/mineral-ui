/* @flow */
import { Component } from 'react';
import Button from '../../../../../library/Button';
import Flex, { FlexItem } from '../../../../../library/Flex';
import Table from '../../../../../library/Table';
import data from '../shared/data';

export default {
  id: 'controlled',
  title: 'Controlled',
  description: `Table controls its own state by default, and can optionally
be managed by the application as a controlled component via the control props,
\`selectedRows\` and \`sort\`.`,
  scope: { Button, Component, Table, Flex, FlexItem, data },
  source: `
    () => {
      const evenRows = data.filter((row, index) => (index + 1)%2 === 0);
      const oddRows = data.filter((row) => evenRows.indexOf(row) === -1);

      const columns = [
        { content: 'Fruits', key: 'Fruits', sortable: true },
        { content: 'Vegetables', key: 'Vegetables', sortable: true },
        { content: 'Grains', key: 'Grains', sortable: true },
        { content: 'Dairy', key: 'Dairy', sortable: true },
        { content: 'Protein', key: 'Protein' }
      ];

      const initialState = {
        selectedRows: oddRows
      };

      class MyTable extends Component {
        constructor(props) {
          super(props);

          this.state = initialState;

          this.handleSelectRows = this.handleSelectRows.bind(this);
          this.handleSort = this.handleSort.bind(this);
          this.reset = this.reset.bind(this);
          this.selectEvenRows = this.selectEvenRows.bind(this);
          this.sortColumnBAsc = this.sortColumnBAsc.bind(this);
        }

        handleSelectRows(selectedRows) {
          this.setState({ selectedRows });
        }

        handleSort(sort) {
          this.setState({ sort })
        }

        reset() {
          this.setState(initialState)
        }

        selectEvenRows() {
          this.handleSelectRows(evenRows)
        }

        sortColumnBAsc() {
          this.handleSort({ key: 'Grains', descending: true })
        }

        render() {
          return (
            <div>
              <Flex marginBottom="md">
                <FlexItem>
                  <Button onClick={this.selectEvenRows} size="medium">Select even rows</Button>
                </FlexItem>
                <FlexItem>
                  <Button onClick={this.sortColumnBAsc} size="medium">Sort by Grains, desc</Button>
                </FlexItem>
                <FlexItem marginLeft="auto">
                  <Button onClick={this.reset} size="medium">Reset</Button>
                </FlexItem>
              </Flex>
              <Table
                columns={columns}
                data={data}
                rowKey="Fruits"
                enableRowSelection
                selectedRows={this.state.selectedRows}
                onSelectRows={this.handleSelectRows}
                sort={this.state.sort}
                onSort={this.handleSort}
                title="Delicious Foods"
                hideTitle />
            </div>
          );
        }
      }

      return <MyTable />;
    }
    `
};
