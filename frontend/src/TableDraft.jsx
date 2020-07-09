import { useTable } from 'react-table'
import React from 'react'
import { Table } from 'react-bootstrap'

export default function DataTable() {
    const data = React.useMemo(
        () => [
            {}
        ]
    )

    const columns = React.useMemo( 
        () => [
            {
                Header: 'Securities Name',
                accessor: 'name'
            },
            {
                Header: 'Ticker',
                accessor: 'ticker'
            },
            {
                Header: 'Rank',
                accessor: 'rank'
            },
            {
                Header: 'Last Rank',
                accessor: 'lastrank'
            }
        ]
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data })

    return (
        <Table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </Table>
      )
}