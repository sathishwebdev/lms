import React from 'react'
import { Preview, print } from 'react-html2pdf';

function HTMLPrinter({fileName, idKey, content, btnConfig}) {
  return (
    <div className="m-auto">
        <Preview id={idKey} html={content} />

            
<button className={btnConfig.class} onClick={()=>print(fileName, idKey)} style={{margin:"3%"}} >{btnConfig.content}</button>
    </div>
  )
}

export default HTMLPrinter