import React from "react"
import Table from "../components/Table";
import { useSelector, useDispatch } from "react-redux";
import AddInput from "../components/AddInput";
import { submit_store } from "../util/type";

const Store = () => {
    const store:any = useSelector((state) => state);
    const placeHolder={name:"Enter your store",nameType:"string",city:"Enter your City",cityType:"string",country:"entery your country",countryType:"string",storeName:"store",cityName:"city",countryName:"country"}


    return (
        <>
           {store.form_disable&& <AddInput placeHolderProps={placeHolder} submitType={submit_store}/>}
            <Table header={[{tittle:"Delete",field:"delete"},{tittle:"Edit",field:"edit"},{tittle:"Sn",field:"sn"},{tittle:"Store",field:"store"},{tittle:"City",field:"city"},{tittle:"Country",field:"country"}]} tableData={store.store}  submitType={submit_store}/>
        </>
    )
}
export default Store