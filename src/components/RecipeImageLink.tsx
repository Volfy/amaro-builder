import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";

const RecipeImageLink = (props: {
  recipe: { recipeId: string; name: string; imageUrl: string };
}) => {
  const { recipe } = props;
  const imageUrlRequest = api.ut.getImageUrl.useQuery(recipe.imageUrl);
  const urlFull = !imageUrlRequest.isLoading && imageUrlRequest.data?.result;
  return (
    <div className="group gap-2 py-1 hover:scale-105" key={recipe.recipeId}>
      <Link
        href={`/recipe/${recipe.recipeId}`}
        className="flex flex-col items-center"
      >
        <div className="relative aspect-[7/8] h-48 flex-grow-0 rounded-lg shadow-md shadow-orange-800/20 2xl:h-60">
          <Image
            alt={recipe.name || ""}
            src={urlFull || "/loadingbottle.jpg"}
            fill={true}
            className="max-w-sm rounded-lg object-cover"
            sizes="20vw"
            priority={false}
          ></Image>
        </div>
        <div className="text-violet-950 group-hover:text-orange-700">
          {recipe.name}
        </div>
      </Link>
    </div>
  );
};

export default RecipeImageLink;
