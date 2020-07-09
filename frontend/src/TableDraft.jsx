import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter'
import paginationFactory from 'react-bootstrap-table2-paginator'
import values from './s&p500.json'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const sectorOptions = {
    0: "Industrials",
    1: "Health Care",
    2: "Information Technology",
    3: "Communication Services",
    4: "Communcation Discretionary",
    5: "Consumer Staples",
    6: "Materials",
    7: "Real Estate",
    8: "Utilities",
    9: "Financials",
    10: "Energy"
}


const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange
  }) => (
    <div className="btn-group" role="group">
      {
        options.map((option) => {
          const isSelected = currSizePerPage === `${option.page}`;
          return (
            <button
              key={ option.text }
              type="button"
              onClick={ () => onSizePerPageChange(option.page) }
              className={ `btn ${isSelected ? 'btn-primary' : 'btn-light'}` }
            >
              { option.text }
            </button>
          );
        })
      }
    </div>
  );
  
  const options = {
    sizePerPageRenderer
  };

const columns = [
  {
    dataField: "Name",
    text: "Company Name",
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "Symbol",
    text: "Ticker",
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "Sector",
    text: "Company Sector",
    filter: selectFilter({
        options: sectorOptions
    })
  },
  {
    dataField: "rank",
    text: "Rank",
    sort: true,
  },
  {
    dataField: "lastrank",
    text: "Last Rank",
    sort: true,
  },
];

export default () => (
  <BootstrapTable
    bootstrap4
    keyField="rank"
    data={values}
    columns={columns}
    filter={filterFactory()}
    filterPosition="top"
    pagination = { paginationFactory(options) }
  />
);
