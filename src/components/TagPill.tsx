const TagPill = (props: { tag: string }) => {
  const tag = props.tag;
  return (
    <span className="inline-block rounded-md bg-rose-950 px-2 py-0.5 text-white shadow-sm shadow-orange-800/50 hover:scale-105">
      {tag.toLowerCase()}
    </span>
  );
};

export default TagPill;
