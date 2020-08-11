import React from "react";
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
import stockData from './companyMentioned.json'
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap"


function ReactTable() {

  const data = React.useMemo(
    () => stockData
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Company Name',
        accessor: 'Company Name', // accessor is the "key" in the data
      },
      {
        Header: 'Symbol',
        accessor: 'ACT Symbol',
      },
      {
        Header: 'Rank',
        accessor: 'CurrentRank',
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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  const firstPageRows = data.slice(0, 20)

  return (
    <>
      <Table striped {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
      <Container fluid>
        <Row>
          <div className="pagination">
            <Col>
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
            <Col>
            <div>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
              | Go to page:{' '}
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
              </Form>
            
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
            </div>{' '}
            </Col> 
          </div>
        </Row>
      </Container>
    </>
  )
}
export default ReactTable
