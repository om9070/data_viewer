import React from "react";

 const Store = React.lazy(() => import("../page/Store"));
 const sku = React.lazy(() => import("../page/Sku"));
 const planning = React.lazy(() => import("../page/Planning"));
 const chart = React.lazy(() => import("../page/Chart"));
 export {Store,sku,planning,chart}
