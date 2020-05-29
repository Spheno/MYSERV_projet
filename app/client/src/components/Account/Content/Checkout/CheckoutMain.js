import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../../Header/Header";
import SVGIcon from "../../../SVG/SVGIcon";
import LoaderScreen from "../../../Loader/LoaderScreen";

import checkoutSVG from "../../../../images/checkout.svg";
import Footer from "../../../Footer/Footer";
import productsAPI from "../../../../utils/productsAPI";
import StripePayment from "./StripePayment";
import PaypalPayment from "./PaypalPayment";

export default function CheckoutMain() {
  let location = useLocation();

  const { cart, totalAmount, phoneNumber } = location.state;

  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  console.log("state", location.state);

  useEffect(() => {
    async function getCart() {
      cart.map(async (productID) => {
        try {
          console.log("id", productID);
          const product = await productsAPI.getProductByID(productID);
          setProducts((products) => [...products, product]);
        } catch (error) {
          console.log(error);
        }
      });
    }

    const userData = localStorage.getItem("user");
    setEmail(userData.email);

    getCart();
    setLoading(false);
  }, [cart]);

  return (
    <div className="p-6 bg-purple-700">
      <div className="flex flex-col font-sans bg-white">
        <div className="container px-8 mx-auto">
          <Header />

          <main className="flex flex-col-reverse items-center py-8 my-12 sm:flex-row jusitfy-between">
            <div className="flex flex-col items-center w-full text-center sm:items-start sm:text-left">
              <h1 className="mb-2 text-6xl font-bold leading-none tracking-wide text-blue-900">
                Checkout your cart
              </h1>
              <h2 className="mb-6 text-4xl tracking-widest text-orange-500 text-secondary">
                The last step.
              </h2>
            </div>
            <SVGIcon
              src={checkoutSVG}
              cls="absolute right-0 z-0 h-64 hidden max-w-xs mr-32 lg:flex"
            />
            <div className="mt-8 mb-16 sm:mb-0 sm:mt-0 sm:w-3/5 sm:pl-12"></div>
          </main>

          {(loading || products.length === 0) && <LoaderScreen />}

          {console.log("products", products)}
          {!loading && products.length > 0 && (
            <div className="container px-4 mb-20">
              <div className="flex flex-wrap justify-center mb-10 text-center">
                <div className="w-full px-4 lg:w-1/2">
                  <h2 className="text-4xl font-semibold text-black">
                    You are so close
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-gray-500">
                    Here you can buy your products in total safety.
                  </p>
                  <p className="mb-4 text-lg leading-relaxed text-gray-500">
                    Either by card or Paypal. That's your choice.
                  </p>
                </div>
              </div>

              <div class="w-full flex flex-wrap">
                <div class="w-full md:w-1/2 flex flex-col">
                  <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                    <p class="text-center text-3xl">Receipt.</p>

                    <div class="text-center pt-12 pb-2">
                      <div className="flex flex-wrap justify-center py-2 border-b-2">
                        {products.map((product, index) => {
                          return (
                            <React.Fragment key={index}>
                              <div className="w-1/2 font-semibold text-black">
                                {product.title}
                              </div>
                              <div className="w-1/2 italic font-thin text-gray-600">
                                {product.price}$
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </div>

                      <div className="flex justify-center py-2">
                        <div className="w-1/2 font-semibold text-black uppercase">
                          Total
                        </div>
                        <div className="w-1/2 font-thin text-gray-600">
                          {totalAmount}$
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-full md:w-1/2 z-0 block md:flex justify-center">
                  <div className="text-3xl font-medium leading-snug tracking-wider text-center text-gray-800">
                    <StripePayment
                      name="Shoofly"
                      description="Testing stripe checkouts"
                      amount={totalAmount}
                      cart={cart}
                      phoneNumber={phoneNumber}
                      email={email}
                    />
                  </div>

                  <div className="mx-8 my-2 text-2xl font-medium leading-snug tracking-wider text-center text-gray-800">
                    OR
                  </div>

                  <div className="text-3xl font-medium leading-snug tracking-wider text-center text-gray-800">
                    <PaypalPayment
                      name="Shoofly"
                      description="Testing paypal checkouts"
                      amount={totalAmount}
                      cart={cart}
                      phoneNumber={phoneNumber}
                      email={email}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
