import React from "react";
import Quote from "../../../Quote";

export default class ProfileReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: []
    };
  }

  // TODO: schéma commentaires avec chacun un ID relié à un User
  // Récupérer tableau de commentaires pour son PROFIL
  componentDidMount() {
    this.setState({ reviews: this.props.reviews });
  }

  render() {
    let { reviews } = this.state;

    if (reviews.length === 0) {
      return (
        <Quote name="Some Like It Hot, 1959" quote="Well, nobody's perfect." />
      );
    } else {
      return (
        <div>
          {/* liste des commentaires avec avatar, nom (lien vers profil), titre com., contenu et date */}
          <div>
            {/* reviews.map((review) => {
                return <Review review={review} /> 
            }) */}
          </div>
        </div>
      );
    }
  }
}
