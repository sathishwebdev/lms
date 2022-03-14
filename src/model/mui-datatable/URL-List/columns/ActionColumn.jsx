import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

function ActionColumn({ urlId, name }) {
  return (
    <div>
      <Link to={`url/edit/${urlId}`}>
        <Tooltip title={`Edit URL: ${name}`} placement="bottom">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Link>
    </div>
  );
}

export default ActionColumn;