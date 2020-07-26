import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import companies from "./companyMentioned.json"
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
          className={`btn page-link ${isSelected ? "active" : ""}`}
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
    dataField: "Company Name",
    text: "Company Name",
    sort: true,
  },
  {
    dataField: "ACT Symbol",
    text: "Ticker",
    sort: true,
  },
  {
    dataField: "CurrentRank",
    text: "Rank",
    sort: true,
    searchable: false,
  },
  {
    dataField: "LastRank",
    text: "Last Rank",
    sort: true,
    searchable: false,
  },
  {
    dataField: "ChangeInRank",
    text: "Rank Change",
    sort: true,
  }
];

export default () => (
  <ToolkitProvider keyField="rank" data={companies} columns={columns} search>
    {(props) => (
      <div>
        <h3>Search for company or ticker:</h3>
        <SearchBar {...props.searchProps} />
        <hr />
        <BootstrapTable
          keyField="rank"
          data={companies}
          columns={columns}
          pagination={paginationFactory(options)}
          {...props.baseProps}
          bootstrap4
        />
      </div>
    )}
  </ToolkitProvider>
);
