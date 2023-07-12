import Image from "next/image";
import { api } from "~/utils/api";

const RecipeMainImage = (props: { name: string; imageUrl: string }) => {
  const { imageUrl, name } = props;
  const realUrlRequest = api.ut.getImageUrl.useQuery(imageUrl);
  const realUrl =
    !realUrlRequest.isLoading && !realUrlRequest.isError
      ? realUrlRequest.data.result
      : "/loadingbottle.jpg";
  return (
    <div className="relative row-span-2 row-start-2 aspect-[7/8] overflow-hidden rounded-xl shadow-md shadow-orange-800/20 2xl:row-span-4 2xl:row-start-3">
      <Image
        alt={name || ""}
        priority={true}
        src={realUrl}
        fill={true}
        className="rounded-xl object-cover"
        sizes="20vw"
      ></Image>
    </div>
  );
};

export default RecipeMainImage;
