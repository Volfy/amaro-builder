import { useState, useRef, useEffect } from "react";

type IngredientProps = {
  ingredient: {
    ingredientId: string;
    measure: string;
    unitOfMeasure: string;
    primaryName: string;
    altNames: string;
    shortDesc: string;
    longDesc: string;
    usageNotes: string;
    tags: Array<string>;
  };
};

const Ingredient = (props: IngredientProps) => {
  const ingredient = props.ingredient;
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setWidth(ref.current?.offsetWidth || 0);
    setHeight(ref.current?.offsetHeight || 0);
  }, []);

  const trimString = (string: string) =>
    string.length > 23 ? string.slice(0, 23) + "..." : string;

  return (
    <li key={ingredient.ingredientId} className="relative">
      <span className="peer" ref={ref}>
        {ingredient.measure}
        {ingredient.unitOfMeasure} {ingredient.primaryName}
      </span>
      {/* prettier-ignore-attribute (className) */}
      <div
        className="invisible absolute z-10 w-48 rounded-md rounded-tl-none bg-orange-200 p-4 text-xs opacity-0 shadow-xl shadow-orange-800/20
          before:absolute before:-left-[6px] before:top-0 before:border-b-8 before:border-r-8 before:border-t-0 before:border-transparent before:border-r-orange-200 
          peer-hover:visible peer-hover:opacity-100 peer-hover:transition-opacity peer-hover:delay-200"
        style={{ left: `${width + 12}px`, top: `${height / 2}px` }}
      >
        <div className="flex flex-col gap-2 text-center text-stone-600">
          <div>{trimString(ingredient.altNames || ingredient.primaryName)}</div>
          <div className="text-black">{ingredient.shortDesc}</div>
          <div className="flex flex-row flex-wrap justify-center gap-0.5">
            {ingredient.tags
              .sort((a, b) => a.length - b.length)
              .map((tag) => (
                <span
                  className="left-0 inline-block rounded bg-rose-950 px-1.5 py-0.5 text-white shadow-sm shadow-orange-800/50"
                  key={tag}
                >
                  {tag.toLowerCase()}
                </span>
              ))}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Ingredient;
