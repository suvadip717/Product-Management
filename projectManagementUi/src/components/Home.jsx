import React, { useEffect, useState } from "react";
import productService from "../service/product.service";
import { Link } from "react-router-dom";

const Home = () => {
  const [productList, setproductList] = useState([]);

  const [msg,setMsg] = useState("");
  useEffect(() => {
    init()
  }, []);

  const init = ()=>{
    productService
      .getAllProduct()
      .then((res) => {
        // console.log(res.data);
        setproductList(res.data);
      })
      .catch((Error) => console.log(Error));
  }

  const deleteProduct = (id) => {
    productService
      .deleteProduct(id)
      .then((res) => {
        setMsg("Product Delete Sucessfully");
        init();
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header fs-3 text-center">
                All Product List
                { msg && <p className="fs-6 text-danger text-center text-sucess">{msg}</p>}
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Sl No</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map(
                      (
                        { id, productName, description, price, status },
                        num
                      ) => (
                        <tr key={id}>
                          <th scope="row">{num + 1}</th>
                          <td>{productName}</td>
                          <td>{description}</td>
                          <td>{price}</td>
                          <td>{status}</td>
                          <td>
                            <Link to={"edit/"+id} className="btn btn-sm btn-primary">
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteProduct(id)}
                              className="btn btn-sm btn-danger ms-2"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
