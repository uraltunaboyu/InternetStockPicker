import React, { Component } from 'react';
import { FancyGridReact, Grid } from 'fancygrid-react';

class TableDraft extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Grid
                    selModel='rows'
                    theme='gray'
                    height={400}
                    width={500}
                    defaults={{ sortable: true }}
                    trackOver={true}
                    columns={this.getColumns()}
                    data={this.getData()}>
                </Grid>
            </div>
        );
    }

    getColumns() {
        return [{
            index: 'company',
            title: 'Company',
            type: 'string',
            width: 100
        }, {
            index: 'name',
            title: 'Name',
            type: 'string',
            width: 100
        }, {
            index: 'surname',
            title: 'Sur Name',
            type: 'string',
            width: 100
        }, {
            index: 'age',
            title: 'Age',
            type: 'number',
            width: 100
        }];
    }

    getData() {
        return [
            { name: 'Ted', surname: 'Smith', company: 'Electrical Systems', age: 30 },
            { name: 'Ed', surname: 'Johnson', company: 'Energy and Oil', age: 35 },
            { name: 'Sam', surname: 'Williams', company: 'Airbus', age: 38 },
            { name: 'Alexander', surname: 'Brown', company: 'Renault', age: 24 },
            { name: 'Nicholas', surname: 'Miller', company: 'Adobe', age: 33 }
        ];
    }

}

export default TableDraft;