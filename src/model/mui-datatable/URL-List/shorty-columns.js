import ActionColumn from "./columns/ActionColumn";
import LongUrlColumn from "./columns/LongUrlColumn";
import ShortUrlColumn from "./columns/shortUrlColumn";
import ViewColumn from "./columns/ViewColumn";

export const shortyColumns = [
    {
        name: "_id",
        label: "",
        options:{
            filter: false,
            sort:false,
            display: false,
            viewColumns : false
        }
    },
     {
        name: "name",
        label: "Name",
        options:{
            filter: true,
            sort:false,
            viewColumns : false
        }
    },
    {
        name:"longUrl",
        label:"Url",
        options:{
            filter: false,
            sort: false,
            viewColumns : false,
            customBodyRender: (value, tableMeta) =>{
                const name = tableMeta.rowData[2]
                return <LongUrlColumn url = {value} name = {name} />
            }
        }
    },
   
    {
        name:"shortUrl",
        label:"Short-Url",
        options:{
            filter: false,
            sort: false,
            viewColumns : false,
            customBodyRender: (value) =>{
                return <ShortUrlColumn shortUrl = {value}/>
            }
        }
    },
    {
        name:"viewCount",
        label:"Views",
        options:{
            filter: false,
            sort: true,
            viewColumns : false,
            customBodyRender: (value) =>{
                return <ViewColumn views = {value}/>
            }
        }
    },
    {
        name: "_id",
        label: "Actions",
        options: {
          filter: false,
          sort: false,
          viewColumns: false,
          customBodyRender: (urlId, tableMeta) => {
            const name = tableMeta.rowData[2];
            return <ActionColumn urlId={urlId} name={name} />;
          },
        },
      },
]