import React, { Suspense } from "react";
import {  Route, Routes } from "react-router-dom";
import Headers from "../components/Header";
import Store from "./Store";
import Sku from "./Sku";
import Planning from "./Planning";
import Chart from "./Chart";
import TopHeader from "../components/TopHeader";


const LoadingFallback = () => (
    <div className="loading-spinner">
        <p>Loading...</p>
    </div>
);

// Layout component to avoid repeating the Navbar
const Layout: React.FC<{ children: any }> = ({ children }) => (
    <>
        <Suspense fallback={<LoadingFallback />}>
            {children}
        </Suspense>
    </>
);


const Home = () => {
    return (
        <>
            <div className="container">
                {/* <!-- Header --> */}
               <TopHeader/>

                <div className="main-content">
                    <Headers/>
                    <div className="router">
                    <Routes>
                        <Route path="/" element={
                            <Layout>
                                <Store  />
                            </Layout>
                        } />
                        <Route path="/sku" element={
                            <Layout>
                                <Sku  />
                            </Layout>
                        } />
                         <Route path="/planning" element={
                            <Layout>
                                <Planning />
                            </Layout>
                        } />
                         <Route path="/chart" element={
                            <Layout>
                                <Chart />
                            </Layout>
                        } />
                    </Routes>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home;
