import {
  addSku,
  addStore,
  deleted,
  deleted_sku,
  editData,
  inputForm,
  SkuDeleted,
} from "./action";

export interface storeState {
  store: any[]; // You can replace `any` with a proper type if you know the structure
  add_sku: any[]; // Same here — replace `any` with a proper type
  form_disable: boolean;
  editData: any;
}

interface storeAction {
  type: string;
  payload?: any; // You can narrow down the payload type based on the action
}

const initialState: storeState = {
  store: [],
  add_sku: [],
  form_disable: false,
  editData: [],
};

const ChartReducer = (
  state = initialState,
  action: storeAction
): storeState => {
  switch (action.type) {
    case addStore:
      return {
        ...state,
        store: Array.isArray(state?.store)
          ? state.store.some((item: any) => item.sn === action.payload.sn)
            ? state.store.map((item: any) =>
                item.sn === action.payload.sn
                  ? { ...item, ...action.payload } // Update existing item
                  : { ...item } // Ensure a new object is returned (fix shallow comparison issue)
              )
            : [...state.store, { ...action.payload }] // Add new item if `sn` doesn't exist
          : [{ ...action.payload }], // Ensure store is initialized as an array
      };
    case addSku:
      return {
        ...state,
        add_sku:
          state?.add_sku && state?.add_sku?.length > 0
            ? state.add_sku.some((item: any) => item.sn === action.payload.sn)
              ? state.add_sku.map((item: any) =>
                  item.sn === action.payload.sn
                    ? { ...item, ...action.payload } // Update existing item
                    : item
                )
              : [...state.add_sku, action.payload] // Add new item if `sn` doesn't exist
            : [action.payload], // Initialize if `add_sku` is empty
      };

    case inputForm:
      return { ...state, form_disable: action.payload };
    case deleted:
      return {
        ...state,
        store: state.store.filter((e, ind) => ind !== action.payload),
      };
    case SkuDeleted:
      return {
        ...state,
        add_sku: state.add_sku.filter((e, ind) => ind !== action.payload),
      };
    case editData:
      return { ...state, editData: action.payload };
    default:
      return state;
  }
};

export default ChartReducer;
