import { useDispatch } from "react-redux";
import { deleted, editData, inputForm, SkuDeleted } from "../redux/action";
import { useEffect } from "react";
import { submit_sku, submit_store } from "../util/type";
import { useSelector } from "react-redux";




interface TableSection {
    header:  { [key: string]: any }        // Define header as an array of strings
    tableData: { [key: string]: any }[];    
    submitType:string
}


const Table: React.FC<TableSection> = ({ header, tableData,submitType }) => {
    const dispatch=useDispatch();
    const storeData:any=useSelector((data)=>data)

    useEffect(()=>{
        dispatch({type:inputForm,payload:false})
    },[])

    const hanldeDelete=(id:number)=>{
        if(submitType==submit_store){
            dispatch({type:deleted,payload:id})
        }else if(submitType==submit_sku){
            dispatch({type:SkuDeleted,payload:id})
        }
    }

    const hanldeEdit=(id:number)=>{
        if(submitType==submit_store){
            const getStore=storeData.store.find((e:any,i:number)=>i===id)
            
            dispatch({type:editData,payload:getStore})

        }else if(submitType==submit_sku){
            const getStoreSku=storeData.add_sku.find((e:any,i:number)=>i===id)

            dispatch({type:editData,payload:getStoreSku})
        }
        dispatch({type:inputForm,payload:true})

    }

    return (
        <>
            <div className="content-area">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                {
                                    header.map((hed:any, ind:number) => {
                                        return (
                                        <>
                                        <th key={ind}>{hed.tittle}</th>
                                        </>

                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                              tableData.length>0&&tableData.map((val, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td><button className="action-btn" onClick={()=>hanldeDelete(index)}><i className="fas fa-trash"></i></button></td>
                                                <td><button className="action-btn" onClick={()=>hanldeEdit(index)}><i className="fas fa-edit"></i></button></td>
                                                {
                                                    header.slice(2).map((had:any,index:number)=>{
                                                        return(
                                                            <>
                                                            <td key={index}>{val[had.field]}</td>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
                <div className="button-container">
                    <button className="new-store-btn" onClick={()=>{dispatch({type:inputForm,payload:true})}}>New Store</button>
                </div>
            </div>
        </>
    )
}
export default Table