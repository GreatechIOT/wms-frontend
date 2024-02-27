import React from "react";
import moment from "moment";

const UpdateDateTemplate = (options: any) => {
  if (options.updateDate) {
    return moment(options.updateDate).format("lll");
  } else {
    return <>-</>;
  }
};

export default UpdateDateTemplate;
