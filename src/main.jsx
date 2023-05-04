import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";

import { App } from "./App";
// import { columns, data } from "./Components/Data";
import Table from "./Table";
// import makeData from "./Components/Data2";
// import { columns, data } from "./Components/Data2";
import makeData, { defaultColumns, defaultData } from "./Components/Data2";
const { data, columns } = makeData(defaultColumns, defaultData);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Table columns={columns} data={data} />
  </React.StrictMode>
);
