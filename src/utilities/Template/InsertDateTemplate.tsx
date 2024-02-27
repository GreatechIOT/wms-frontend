import React from "react";
import moment from "moment";

const InsertDateTemplate = (options: any) => {
  if (options.insertDate) {
    return moment(options.insertDate).format("lll");
  } else if (options.News_datetime) {
    return moment(options.News_datetime).format("lll");
  }
  else {
    return <></>;
  }
};

export default InsertDateTemplate;
