// Define action types as constants
export const addStore = "add_store";
export const addSku = "add_sku";
export const inputForm="input_form";
export const deleted="store_delete";
export const SkuDeleted="sku_delete";
export const editData="edit_data";




interface addStoreAction {
  type: typeof addStore;
  payload: any; // Replace `any` with a proper movie type if available
}

interface addSkuAction {
  type: typeof addSku;
  payload: any; // Replace `any` with the appropriate type
}

interface inputDisable {
  type: typeof inputForm;
  payload: boolean;
}

interface deleteData{
  type:typeof deleted;
  payload:number
}

interface SkuDeletedData{
  type:typeof SkuDeleted;
  payload:number
}


interface editDataTable{
  type:typeof editData;
  payload:number
}


// Combine action types using a union
export type StoreManage =  addStoreAction | addSkuAction |inputDisable|deleteData|SkuDeletedData|editDataTable;


export const add_store_collection = (data: any): addStoreAction => {
  return { type: addStore, payload: data };
};

export const pagination_data = (data: any): addSkuAction => {
  return { type: addSku, payload: data };
};

export const input_form_disable = (data: any): inputDisable => {
  return { type: inputForm, payload: data };
};

export const deleted_data = (data: any): deleteData => {
  return { type: deleted, payload: data };
};


export const deleted_sku = (data: any): SkuDeletedData => {
  return { type: SkuDeleted, payload: data };
};

export const edit_data = (data: any): editDataTable => {
  return { type: editData, payload: data };
};