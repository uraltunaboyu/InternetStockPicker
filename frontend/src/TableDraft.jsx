import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import values from "./s&p500.json";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";


const { SearchBar } = Search;
const sizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange,
}) => (
  <div className="btn-group" role="group">
    {options.map((option) => {
      const isSelected = currSizePerPage === `${option.page}`;
      return (
        <button
          key={option.text}
          type="button"
          onClick={() => onSizePerPageChange(option.page)}
          className={`btn ${isSelected ? "btn-primary" : "btn-light"}`}
        >
          {option.text}
        </button>
      );
    })}
  </div>
);

const options = {
  sizePerPageRenderer,
};

const columns = [
  {
    dataField: "Name",
    text: "Company Name",
    sort: true,
  },
  {
    dataField: "Symbol",
    text: "Ticker",
    sort: true,
  },
  {
    dataField: "Sector",
    text: "Company Sector",
  },
  {
    dataField: "rank",
    text: "Rank",
    sort: true,
    searchable: false,
  },
  {
    dataField: "lastrank",
    text: "Last Rank",
    sort: true,
    searchable: false,
  },
];

export default () => (
  <ToolkitProvider keyField="rank" data={values} columns={columns} search>
    {(props) => (
      <div>
        <h3>Search for company or ticker:</h3>
        <SearchBar {...props.searchProps} />
        <hr />
        <BootstrapTable
          bootstrap4
          keyField="rank"
          data={values}
          columns={columns}
          pagination={paginationFactory(options)}
          {...props.baseProps}
        />
      </div>
    )}
  </ToolkitProvider>
);
