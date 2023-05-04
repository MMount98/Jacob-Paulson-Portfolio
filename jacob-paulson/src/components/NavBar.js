import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="btn btn-ghost normal-case text-xl">Jacob Paulson</div>
      </div>
      <div className="navbar-end">
        <Link to="#" className="btn btn-outline mr-6">
          Contact Me!
        </Link>
      </div>
    </div>
  );
}
