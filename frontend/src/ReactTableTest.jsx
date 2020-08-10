import React from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
import stockData from './companyMentioned.json'
import { Table } from "react-bootstrap"


function ReactTableTest() {

    const data = React.useMemo(
        () => stockData
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Company Name',
                accessor: 'Company Name', // accessor is the "key" in the data
                disableSortBy: true
            },
            {
                Header: 'Symbol',
                accessor: 'ACT Symbol',
                disableSortBy: true
            },
            {
                Header: 'Rank',
                accessor: 'CurrentRank'
            },
            {
                Header: 'Change in Rank',
                accessor: 'ChangeInRank'
            }
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        { 
            columns,
            data },
        useSortBy
    )

    const firstPageRows = rows.slice(0, 20)

    return (
        <>
          <Table striped bordered {...getTableProps()}> 
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    // Add the sorting props to control sorting. For this example
                    // we can add them into the header props
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' - '
                            : ' + '
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {firstPageRows.map(
                (row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        )
                      })}
                    </tr>
                  )}
              )}
            </tbody>
          </Table>
          <br />
          <div>Showing the first 20 results of {rows.length} rows</div>
        </>
      )
}
export default ReactTableTest
