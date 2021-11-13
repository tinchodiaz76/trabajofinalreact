import EditForm from "../../components/EditForm/EditForm";
import {API} from "../../API";
import { useEffect, useState } from "react";

const Item = ({itemid}) => {
    const [item,setItem] = useState(null);
    useEffect(()=>{
        API.get("/item?id="+itemid).then((response)=>{
            console.log("item",response);
            setItem(response.data);
        })
    },[]);
    return ( 
        <>
            {item?<EditForm item={item} />:"Cargando"}
        </>
     );
}
 
export default Item;
