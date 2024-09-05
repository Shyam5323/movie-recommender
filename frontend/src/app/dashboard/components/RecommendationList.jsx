// components/RecommendationList.jsx

import RecommendationCard from "./RecommendationCard.jsx";
import Cookies from "js-cookie";

const currentUser = {
  userId: Cookies.get("userId"),
};
const RecommendationList = ({ recommendations, category }) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4">
      {recommendations.map((rec, index) => (
        <RecommendationCard
          key={index}
          {...rec}
          category={category}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default RecommendationList;
