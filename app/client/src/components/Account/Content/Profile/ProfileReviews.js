import React from "react";
import Quote from "../../../Quote";

import API from "../../../../utils/userAPI";
import Review from "./Review";
import LoaderScreen from "../../../Loader/LoaderScreen";

export default class ProfileReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isAuthor: false,
      reviews: []
    };
  }

  // TODO: schéma commentaires avec chacun un ID relié à un User
  // Récupérer tableau de commentaires pour son PROFIL
  async componentDidMount() {
    try {
      const userID = this.props.userID;
      const response = await API.getProfileComments(userID);
      this.setState({
        loading: false,
        isAuthor: this.props.isAuthor,
        reviews: response.reviews
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let { loading, isAuthor, reviews } = this.state;

    if (loading) {
      return <LoaderScreen />;
    } else {
      return (
        <>
          {/* input pour laisser un commentaire */}
          {!isAuthor && (
            <div>
              <div>Not the author</div>
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
            <div>
              <h2>Number of comments: {reviews.length}</h2>
              {reviews.map((review, index) => {
                return <Review key={index} review={review} />;
              })}
            </div>
          )}
        </>
      );
    }
  }
}
