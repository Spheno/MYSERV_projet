import React from "react";
import Article from "./Article";

class ArticlesList extends React.Component {
  render() {
    return (
      <div className="flex flex-wrap items-center justify-center">
        <Article
          bgColor="bg-red-500"
          category="Garden"
          name="Petite Lily"
          devise="€"
          price="36.00"
          src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
        />
        <Article
          bgColor="bg-yellow-500"
          category="Garden"
          name="Petite Lily"
          devise="€"
          price="36.00"
          src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
        />
        <Article
          bgColor="bg-gray-500"
          category="Garden"
          name="Petite Lily"
          devise="€"
          price="36.00"
          src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
        />
        <Article
          bgColor="bg-orange-500"
          category="Garden"
          name="Petite Lily"
          devise="€"
          price="36.00"
          src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
        />
        <Article
          bgColor="bg-teal-500"
          category="Indoor"
          name="Montsera"
          devise="€"
          price="45.00"
          src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
        />
        <Article
          bgColor="bg-purple-500"
          category="Outdoor"
          name="Oak Tree"
          devise="€"
          price="68.50"
          src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
        />
      </div>
    );
  }
}

export default ArticlesList;
