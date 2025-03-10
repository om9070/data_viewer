import { useSelector } from "react-redux";
import AddInput from "../components/AddInput";
import Table from "../components/Table";
import { submit_sku } from "../util/type";

const Sku = () => {
    const store:any=useSelector((data)=>data)
    const placeHolder={name:"Enter your sku",nameType:"string",city:"Enter your price",cityType:"number",country:"entery your cost",countryType:"number",storeName:"sku",cityName:"price",countryName:"cost"}

    return (
        <>
            {store.form_disable&&<AddInput placeHolderProps={placeHolder} submitType={submit_sku} />}
            <Table header={[{tittle:"Delete",field:"delete"},{tittle:"Edit",field:"edit"},{tittle:"Sn",field:"sn"},{tittle:"Sku",field:"sku"},{tittle:"Price",field:"price"},{tittle:"Cost",field:"cost"}]} tableData={store.add_sku} submitType={submit_sku}/>
        </>
    )
}
export default Sku;