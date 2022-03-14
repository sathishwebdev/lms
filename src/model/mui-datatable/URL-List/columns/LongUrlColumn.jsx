import React from "react";


function LongUrlColumn({ url }) {
  
  return (
    <a className = "link"
        href={url} target='_blank' rel="noreferrer" >
      {url.substring(0, 20)}...
    </a>
  );
}

export default LongUrlColumn;