import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../../styles/cartArticle.css";
import avatar from "../../../../images/avatar/einstein.jpg";
import imgNotFound from "../../../../images/articles/not_found.png";
import prodAPI from "../../../../utils/productsAPI";
import userAPI from "../../../../utils/userAPI";
import { confirmAlert } from "react-confirm-alert"; /* custom confirm pop up */
import AlertDeleteArticle from "../../../Alerts/AlertDeleteArticle";
import { ToastContainer, toast } from "react-toastify";
import LoaderScreen from "../../../Loader/LoaderScreen";

/* TODO: make articles clickable and zoomable (Magnifier.js) */

export default class FavArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      showAlert: false,
      dateOptions: {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      },
      dateFormat: "",
      devise: "€",
      pictureToShow: imgNotFound,
      clientPhoneNumber: "",
      user: [],
      product: []
    };
  }

  componentDidMount = async () => {
    try {
      const authorData = JSON.parse(localStorage.getItem("user"));
      this.setState({ clientPhoneNumber: authorData.phoneNumber });
      const productRes = await prodAPI.getProductByID(this.props.article);
      console.log("prod res", productRes);
      const userRes = await userAPI.getUser(
        null,
        "+" + productRes.authorNumber
      );
      console.log("user res", userRes);
      this.setState({ product: productRes, user: userRes });
      this.setState({ pictureToShow: "/" + productRes.pictures[0].path });
      this.setState({
        dateFormat: new Date(
          Date.UTC(
            new Date(productRes.uploadDate).getFullYear(),
            new Date(productRes.uploadDate).getMonth(),
            new Date(productRes.uploadDate).getUTCDate()
          )
        )
      });
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  deleteArticle = async (phoneNumber, productID) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            this.setState({ showAlert: true });
            try {
              const userRes = await userAPI.removeFromFavs(phoneNumber, productID);
              console.log("res remove from favs", userRes);
            } catch (error) {
              console.log("Error delete from favs", error);
            }
          }
        },
        {
          label: "No",
          onClick: () => null
        }
      ]
    });
  };

  closeAlert = () => {
    this.setState({ showAlert: false });
  };

  addToCart = async data => {
    try {
      console.log("data addToCart", data);
      const response = await userAPI.addToCart(data);
      if (response) {
        toast.success("Successfully added to your cart!");
        console.log("addToCart", response);
      }
    } catch (error) {
      toast.error("Oups an error has occured...");
      console.log("Error addToCart", error);
    }
  };

  render() {
    let {
      loading,
      product,
      user,
      dateFormat,
      devise,
      pictureToShow,
      showAlert,
      clientPhoneNumber,
      dateOptions
    } = this.state;

    let dateFormated = new Intl.DateTimeFormat("default", dateOptions).format(
      dateFormat
    );

    if (loading) {
      return <LoaderScreen />;
    }

    return (
      <article className="overflow-hidden rounded-lg shadow-lg">
        <AlertDeleteArticle
          showAlert={showAlert}
          closeAlert={this.closeAlert.bind(this)}
        />

        <div className="form-group">
          <ToastContainer />
        </div>

        <img
          alt="Article example"
          className="block w-full h-40"
          src={pictureToShow}
        />

        <header className="flex items-center justify-between p-2 leading-tight md:p-4">
          <h1 className="text-lg">
            <a
              className="font-bold text-gray-900 no-underline hover:underline"
              href="#top"
            >
              {product.title} -{" "}
              <span className="text-gray-700">
                {product.price}
                {""}
                {devise}
              </span>
            </a>
          </h1>
          <p className="text-sm text-grey-darker">{dateFormated}</p>
        </header>

        <div className="flex flex-col justify-between px-4 py-2 leading-normal">
          <p className="mb-4 text-base text-gray-700">
            {product.description || <span className="italic">None</span>}
          </p>

          <div className="block mt-1 mb-4">
            {product.tags.length > 1 &&
              product.tags.map((tag, index) => {
                return (
                  <button
                    key={index}
                    className="inline px-2 py-1 mx-1 text-xs text-gray-700 lowercase bg-gray-300"
                    href="#top"
                  >
                    #{tag}
                  </button>
                );
              })}
            {product.tags.length <= 1 && <p className="italic">No tags</p>}
          </div>
        </div>

        <footer className="relative flex items-center p-2 leading-none md:p-4">
          {/* TODO: lien vers le profil de l'utilisateur */}
          <a
            className="flex items-center text-black no-underline hover:underline"
            href="#top"
          >
            <img
              alt="Placeholder"
              className="w-10 h-10 mr-2 rounded-full"
              src={avatar}
            />
            <p className="text-sm">
              {user.firstname} {user.lastname.charAt(0) + "."}
            </p>
          </a>
          <div className="absolute right-0 flex justify-end text-2xl">
            <button className="px-1 m-1 text-gray-700 no-underline hover:text-teal-600">
              <Link
                to={{
                  pathname: "product/" + product._id,
                  state: { product: product }
                }}
              >
                <span className="hidden">Details</span>
                <FontAwesomeIcon icon="info-circle" />
              </Link>
            </button>
            <button
              className="px-1 m-1 text-gray-700 no-underline hover:text-green-600"
              onClick={() =>
                this.addToCart({
                  productID: product._id,
                  buyerPhoneNumber: clientPhoneNumber
                })
              }
            >
              <span className="hidden">Add to cart</span>
              <FontAwesomeIcon icon="shopping-cart" />
            </button>
            <button
              className="px-1 m-1 text-gray-700 no-underline hover:text-black"
              href="#top"
              onClick={() =>
                this.deleteArticle(clientPhoneNumber, product._id)
              }
            >
              <span className="hidden">Delete</span>
              <FontAwesomeIcon icon="trash-alt" />
            </button>
          </div>
        </footer>
      </article>
    );
  }
}
