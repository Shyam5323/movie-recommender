// components/RecommendationList.jsx

import RecommendationCard from "./RecommendationCard.jsx";

const RecommendationList = ({ recommendations, category }) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recommendations.map((rec, index) => (
        <RecommendationCard key={index} {...rec} category={category} />
      ))}
    </div>
  );
};

export default RecommendationList;
