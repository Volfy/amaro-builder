const RecipeTitle = (props: {
  name: string;
  volume: string;
  measure: string;
}) => {
  const { name, volume, measure } = props;
  return (
    <div className="flex justify-between text-xl 2xl:text-2xl">
      <div className="font-medium">{name}</div>
      <div>
        {volume} {measure}
      </div>
    </div>
  );
};

export default RecipeTitle;
