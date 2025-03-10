import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { addSku, addStore, editData, inputForm } from "../redux/action";
import { submit_sku, submit_store } from "../util/type";


interface placeName{
    name:string,
    city:string,
    country:string,
    nameType:string,
    cityType:string,
    countryType:string,
    countryName:string,
    cityName:string,
    storeName:string
}

interface propsPlace{
    placeHolderProps:placeName
    submitType:string
}

const AddInput:React.FC<propsPlace>=({placeHolderProps,submitType})=>{
    const storeData:any=useSelector((state)=>state)
    console.log(storeData,"jjjjjjjj",storeData?.editData,"ll",placeHolderProps.storeName)
    const [input,setInput]=useState<any>({[placeHolderProps.storeName]:"",[placeHolderProps.cityName]:"",[placeHolderProps.countryName]:""})
    const dispatch = useDispatch();

    useEffect(()=>{
        setInput({...input,
            [placeHolderProps.storeName]:storeData?.editData[placeHolderProps.storeName],[placeHolderProps.cityName]:storeData?.editData[placeHolderProps.cityName],[placeHolderProps.countryName]:storeData?.editData[placeHolderProps.countryName]
        })
    },[storeData?.editData])

    const hanleChange=(e:any)=>{
        const {name,value}=e.target;
        setInput({...input,[name]:value})
    }
     
    const handleSubmit=()=>{
        if(!input[placeHolderProps.storeName]||!input[placeHolderProps.cityName]||!input[placeHolderProps.countryName]){
            return alert("input field required.")
        }
        
        if(submitType===submit_store){
            dispatch({ type: addStore, payload: {...input,sn:storeData?.editData?.sn??storeData?.store.length} })
        }else if(submitType===submit_sku){
            dispatch({ type: addSku, payload: {...input,sn:storeData?.editData?.sn??storeData?.add_sku.length} })
        }
        setInput({name:"",city:"",country:""})
        dispatch({type:inputForm,payload:false})
        dispatch({type:editData,payload:[]})

    }

    return(
        <>
        <div className="input_Form">
            <input type={placeHolderProps.nameType} name={placeHolderProps.storeName} placeholder={placeHolderProps.name} value={input[placeHolderProps.storeName]} onChange={hanleChange} maxLength={15}/>
            <input type={placeHolderProps.cityType} name={placeHolderProps.cityName} placeholder={placeHolderProps.city} value={input[placeHolderProps.cityName]} onChange={hanleChange} maxLength={15}/>
            <input type={placeHolderProps.countryType} name={placeHolderProps.countryName} placeholder={placeHolderProps.country} value={input[placeHolderProps.countryName]} onChange={hanleChange} maxLength={15}/>
            <button className="btn" onClick={handleSubmit}>submit</button>
        </div>
        </>
    )
}
export default AddInput;