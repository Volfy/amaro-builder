import Image from "next/image";

type RecipeUserInfoType = {
  username: string | null;
  profileImageUrl: string;
};

const RecipeUserInfo = (props: {
  user: RecipeUserInfoType | undefined;
  date: Date;
}) => {
  const { user, date } = props;
  return (
    <div className="group col-start-3 flex flex-col self-start justify-self-end rounded-lg bg-orange-200 px-2 py-1 shadow-md shadow-orange-800/20 2xl:col-start-5">
      <div className="flex flex-row gap-0 py-1 lg:gap-10">
        <div className="flex flex-col">
          <div className="text-xs text-stone-600">Uploaded by</div>
          <div className="text-violet-950 group-hover:text-orange-700">
            {user && user.username ? user.username : "loading"}
          </div>
        </div>

        {user ? (
          <Image
            src={user.profileImageUrl}
            alt=""
            width={200}
            height={200}
            className="h-8 w-8 rounded-full 2xl:h-10 2xl:w-10"
          ></Image>
        ) : (
          <div className="h-8 w-8 bg-black 2xl:h-10 2xl:w-10"></div>
        )}
      </div>
      <div className="text-xs text-stone-600">
        on {date.toLocaleDateString("en-mt")} at{" "}
        {date.toLocaleTimeString("en-mt", { timeStyle: "short" })}
      </div>
    </div>
  );
};

export default RecipeUserInfo;
