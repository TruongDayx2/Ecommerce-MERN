import React from "react";
import { Add } from "@material-ui/icons";
import Navbar from "../../components/navbar/Navbar";
import Products from "../../components/product/Products";
import NewLetter from "../../components/newLetter/NewLetter";
import Footer from "../../components/footer/Footer";
import "./productList.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Chat from '../../components/chatbot/Chat'


const ProductList = () => {
  const location = useLocation();
  const cate = location.pathname.split("/")[2];
  const catePath = location.pathname.split("/")[3];
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("newest");
  const [catePathMen, setCatePathMen] = useState([]);
  const [catePathWomen, setCatePathWomen] = useState([]);
  const [hideCate, setHideCate] = useState(false);

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cate === "men"
            ? `http://localhost:5000/api/products/find/63a072fec23ddef64575c1e4`
            : `http://localhost:5000/api/products/find/63a6a688e798c7ce969e7c71`
        );
        setCatePathMen(res.data.cateMen);
        setCatePathWomen(res.data.cateWomen);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cate]);

  return (
    <div className="proL_container">
      <Navbar />
      {cate === 'men'
        ? <h1 className="proL_title">FOR HIM</h1>
        : <h1 className="proL_title">FOR HER</h1>
      }
      {/* <h1 className="proL_title">{cate}</h1> */}
      <div className="proL_cate">
        <span onClick={() => setHideCate(!hideCate)} className="proL_cateTitle">
          <div className="proL_filterText">Danh Mục</div >
          <Add className="proL_cateIcon" />
        </span>
        {/* { hideCate && 
        (
          <ul className="proL_cateMenu">
          {cate === "men"
            ? catePathMen.map((item, index) => <Link key={index}  to={`/products/${cate}/${item}`}><li className="proL_catePathItem">{item}</li></Link>)
            : catePathWomen.map((item, index) => <Link key={index}  to={`/products/${cate}/${item}`}><li  className="proL_catePathItem">{item}</li></Link>)}
          </ul>
          )
        } */}
        {hideCate && (
          <ul className="proL_cateMenu">
            {cate === "men" ? (
              <>
                <Link to={`/products/${cate}/Polo`} className="proL_catePathLink">
                  <li className="proL_catePathItem">Polo</li>
                </Link>
                <Link to={`/products/${cate}/T-shirts`} className="proL_catePathLink">
                  <li className="proL_catePathItem">Phông</li>
                </Link>
                <Link to={`/products/${cate}/Somi`} className="proL_catePathLink">
                  <li className="proL_catePathItem">somi</li>
                </Link>
                <Link to={`/products/${cate}/WesternPants`} className="proL_catePathLink">
                  <li className="proL_catePathItem">Quần Tây Âu</li>
                </Link>
                <Link to={`/products/${cate}/Shorts`} className="proL_catePathLink">
                  <li className="proL_catePathItem">Quần Ngắn</li>
                </Link>
              </>
            ) : (
              <>
                <Link to={`/products/${cate}/Polo`} className="proL_catePathLink">
                  <li className="proL_catePathItem">Polo</li>
                </Link>
                <Link to={`/products/${cate}/T-shirts`} className="proL_catePathLink">
                  <li className="proL_catePathItem">Phông</li>
                </Link>
                <Link to={`/products/${cate}/Somi`} className="proL_catePathLink">
                  <li className="proL_catePathItem">somi</li>
                </Link>
                <Link to={`/products/${cate}/Dress`} className="proL_catePathLink">
                  <li className="proL_catePathItem">Váy</li>
                </Link>
                <Link to={`/products/${cate}/FemaleJeans`} className="proL_catePathLink">
                  <li className="proL_catePathItem">Quần Jean Nữ</li>
                </Link>
              </>
            )}
          </ul>
        )}
      </div>
      <div className="proL_filterContainer">
        <div className="proL_filterItem">
          <div className="proL_filterText">Filter Product:</div>
          <select
            name="color"
            id=""
            className="proL_select"
            onChange={handleFilter}
            defaultValue={"1"}
          >
            <option value="1" disabled className="proL_option">
              Color
            </option>
            <option value="white" className="proL_option">
              White
            </option>
            <option value="black" className="proL_option">
              Black
            </option>
            <option value="red" className="proL_option">
              Red
            </option>
            <option value="blue" className="proL_option">
              Blue
            </option>
            <option value="yellow" className="proL_option">
              Yellow
            </option>
            <option value="green" className="proL_option">
              Green
            </option>
          </select>
          <select
            name="size"
            id=""
            className="proL_select"
            onChange={handleFilter}
            defaultValue={"1"}
          >
            <option value="1" disabled className="proL_option">
              Size
            </option>
            <option value="XS" className="proL_option">
              XS
            </option>
            <option value="S" className="proL_option">
              S
            </option>
            <option value="M" className="proL_option">
              M
            </option>
            <option value="L" className="proL_option">
              L
            </option>
            <option value="XL" className="proL_option">
              XL
            </option>
            <option value="XXL" className="proL_option">
              XXL
            </option>
          </select>
          {/* <select
            name=""
            id=""
            className="proL_select"
            onChange={(e) => setCatePath(e.target.value)}
            defaultValue={"1"}
          >
            <option value="1" disabled className="proL_option">
              Danh Mục
            </option>
            {cate === "men"
              ? catePathMen.map((item, index) => (
                  <option className="proL_option" value={item} key={index}>
                    {item}
                  </option>
                ))
              : catePathWomen.map((item, index) => (
                  <option className="proL_option" value={item} key={index}>
                    {item}
                  </option>
                ))}
          </select> */}
        </div>
        <div className="proL_filterItem">
          <div className="proL_filterText">Sort Product:</div>
          <select name="" id="" className="proL_select" onChange={(e) => setSort(e.target.value)}>
            <option value="Newest" className="proL_option">
              Newest
            </option>
            <option value="asc" className="proL_option">
              Price (asc)
            </option>
            <option value="desc" className="proL_option">
              Price (desc)
            </option>
          </select>
        </div>
      </div>
      <Products cate={cate} filter={filter} sort={sort} catePath={catePath} />
      <NewLetter />
      <Footer />
      <Chat/>

    </div>
  );
};

export default ProductList;
