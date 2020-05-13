import React from "react";
import Quote from "../../../Quote";

import API from "../../../../utils/userAPI";
import Review from "../../../Review/Review";
import LoaderScreen from "../../../Loader/LoaderScreen";
import InputComment from "../../../Review//InputComment";

export default class ProfileReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isAuthor: false,
      reviews: [],
      clientID: "",
      userID: ""
    };
  }

  async componentDidMount() {
    try {
      const response = await API.getProfileComments(this.props.userID);
      this.setState({
        loading: false,
        isAuthor: this.props.isAuthor,
        reviews: response.reviews,
        clientID: this.props.clientID,
        userID: this.props.userID
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let { loading, isAuthor, reviews, clientID, userID } = this.state;

    if (loading) {
      return <LoaderScreen />;
    } else {
      return (
        <>
          {/* input pour laisser un commentaire */}
          {!isAuthor && (
            <div className="mx-auto">
              <InputComment clientID={clientID} userID={userID} />
              <div className="w-1/2 mx-auto my-4 border-b-4 border-teal-400"></div>
            </div>
          )}

          {reviews.length === 0 && (
            <Quote
              name="Some Like It Hot, 1959"
              quote="Well, nobody's perfect."
            />
          )}

          {/* liste des commentaires avec avatar, nom (lien vers profil), titre com., contenu et date */}
          {reviews.length > 0 && (
            <div className="ml-6">
              <h2 className="text-sm text-justify"><span className="text-xl">{reviews.length}</span> comments here</h2>
              {reviews.map((review, index) => {
                return <Review key={index} review={review} userID={userID} isProduct={false} />;
              })}
            </div>
          )}
        </>
      );
    }
  }
}
