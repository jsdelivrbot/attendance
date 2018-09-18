import React from 'react';
import ReactDOM from 'react-dom';
import { DataTable } from 'react-data-components';

function buildTable(data) {
  const renderMapUrl =
    (val, row) =>
      <a href={`https://www.google.com/maps?q=${row['lat']},${row['long']}`}>
        Google Maps
      </a>;

  const tableColumns = [
    { title: 'ID', prop: 'id' },
    { title: 'NAME', prop: 'name' },
    { title: 'IN TIME', prop: 'intime' },
    { title: 'OUT TIME', prop: 'outtime', defaultContent: '<no phone>' },
    { title: 'WORKING HOUR', render: renderMapUrl, className: 'text-center' },
  ];

  return (
    <DataTable
      className="container"
      keys="id"
      columns={tableColumns}
      initialData={data}
      initialPageLength={5}
      initialSortBy={{ prop: 'id', order: 'descending' }}
      pageLengthOptions={[ 5, 20, 50 ]}
    />
  );
}

fetch('/data.json')
  .then(res => res.json())
  .then((rows) => {
    ReactDOM.render(buildTable(rows), document.getElementById('root'));
  });
