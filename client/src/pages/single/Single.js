import React from "react";
import SinglePost from "../../components/singlePost/SinglePost";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Single() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 px-3">
          <SinglePost />
        </div>
        <div className="col-md-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
