import React, { useState, useEffect } from "react";
import CartArticle from "./CartArticle";
import LoaderScreen from "../../../Loader/LoaderScreen";
import API from "../../../../utils/userAPI";
import EmptyCart from "./EmptyCart";
import { Link } from "react-router-dom";

export default function CartList() {
  const phoneNumber = JSON.parse(localStorage.getItem("user")).phoneNumber;

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [devise, setDevise] = useState("€");
  const [totalAmount, setTotalAmount] = useState(0);
  let total = [];

  useEffect(() => {
    async function getCart() {
      try {
        const myCart = await API.getMyCart(phoneNumber);
        setLoading(false);
        setCart(myCart);
        setDevise("€");
      } catch (error) {
        console.log(error);
      }
    }
    getCart();
  }, [phoneNumber]);

  function updateTotal(childPrice) {
    total.push(childPrice);
    let sum = totalAmount;
    total.map((price) => setTotalAmount(Math.round((sum + price) * 100) / 100));
  }

  if (loading) {
    return <LoaderScreen />;
  }

  if (cart.length) {
    return (
      <div className="z-10">
        <div className="block w-full">
          <h1 className="text-3xl font-medium leading-snug tracking-wider text-center text-gray-800">
            Number of articles: {cart.length}
          </h1>
          <div className="flex justify-center w-full mx-auto my-4">
            <p className="px-6 mt-2 text-lg text-center text-gray-700">
              Total: {totalAmount}
              {devise}
            </p>

            <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
              <Link
                to={{
                  pathname: "/checkout",
                  state: { cart, totalAmount, devise, phoneNumber },
                }}
              >
                Validate cart
              </Link>
            </button>
          </div>
          <div className="w-24 h-1 mx-auto my-6 bg-indigo-700 rounded opacity-75"></div>

          <div className="container px-4 mx-auto my-12 md:px-12">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
              {cart.map((article, index) => {
                return (
                  <div
                    key={index}
                    className="w-full px-1 my-4 sm:w-1/2 md:w-1/3 md:my-4 md:mx-6 lg:w-1/4"
                  >
                    <CartArticle article={article} updateTotal={updateTotal} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else return <EmptyCart />;
}
