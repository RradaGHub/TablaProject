import React from "react";
import { BasicModal } from "./Modal";
import Table from "./Table";
import { columns, data } from "./Data";

const Page1 = ({ open, handleClose }) => {
  return (
    <>
      <BasicModal open={open} handleClose={handleClose}>
        <Table columns={columns} data={data} />
      </BasicModal>
    </>
  );
};

export default Page1;
