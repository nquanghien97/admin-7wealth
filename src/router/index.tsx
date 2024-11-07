import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../layout";
import Home from "../pages/Home";
import News from "../pages/news";
import Order from "../pages/Order";
import Product from "../pages/Product";
import CandidateInformation from "../pages/candidate-information";
import Jobs from "../pages/jobs";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tin-tuc" element={<News />} />
        <Route path="/san-pham" element={<Product />} />
        <Route path="/don-hang" element={<Order />} />
        <Route path="/viec-lam" element={<Jobs />} />
        <Route path="/thong-tin-ung-vien" element={<CandidateInformation />} />
      </Route>
    </>
  )
);

export default router;