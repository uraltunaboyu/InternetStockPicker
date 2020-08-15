import React from "react";
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
import stockData from './companyMentioned.json'
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap"
import matchSorter from 'match-sorter'


function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <div>
      Search:{' '}
      <input class="form-control mr-sm-2" 
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Rank, Symbol or Name`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </div>
  )
}


function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search Rank, Symbol, or Name`}
    />
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}


function ReactTable() {

  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const data = React.useMemo(
    () => stockData
  )

  const columns = React.useMemo(
    () => [

      {
        Header: 'Rank',
        accessor: 'CurrentRank',
      },
      {
        Header: 'Symbol',
        accessor: 'ACT Symbol',
      },
      {
        Header: 'Company Name',
        accessor: 'Company Name', // accessor is the "key" in the data
      },
      {
        Header: 'Change in Rank',
        accessor: 'ChangeInRank',
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    rows,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageIndex: 0 },
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination
  )

  const firstPageRows = data.slice(0, 20)

  return (
    <>
      <Table striped {...getTableProps()}>
        <thead>
        <tr>
            <th
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Container>
        <Row>
          <div className="pagination">
            <Col md="auto">
              <Button variant="dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
              </Button>{' '}
              <Button variant="dark" onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
              </Button>{' '}
              <Button variant="dark" onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
              </Button>{' '}
              <Button variant="dark" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
              </Button>{' '}
            </Col>
            <Col md="auto">
              <div>
                Page{' '}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
              | Go to page:
              </div>
            </Col>
            <Col md="auto">
              <Form inline>
                <Form.Group controlId="formPageNumber">
                  <Form.Control type="number" placeholder={pageIndex + 1} min="1"
                    onChange={e => {
                      let page = e.target.value ? Number(e.target.value) - 1 : 0
                      gotoPage(page)
                    }}
                    style={{ width: '100px' }}
                  />
                </Form.Group>
                <select class="custom-select"
                  value={pageSize}
                  onChange={e => {
                    setPageSize(Number(e.target.value))
                  }}
                  style={{ width: '100px' }}
                >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </Form>
            </Col>
          </div>
        </Row>
      </Container>
    </>
  )
}
export default ReactTable
