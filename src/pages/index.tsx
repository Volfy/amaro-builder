import { type NextPage } from "next";

const Recipe: NextPage = () => {
  return (
    <>
      <section className="flex w-10/12 min-w-full flex-grow flex-col items-center gap-y-8 pt-4">
        <div className="text-xl font-semibold 2xl:text-2xl ">Welcome!</div>
        <p className="max-w-4xl">
          This website was made as a replacement for a Google Sheets document by
          u/riverblueflame on Reddit.
          <br />
          <br />
          While this document has been very useful for my Amaro making process,
          there are some limitations that I didn&apos;t like, such as the
          inability to add new ingredients easily, saving recipes easily, and
          ingredient search without using tags.
          <br />
          <br />
          Additionally, I am using a graph database for the backend, in order to
          collect data on how different ingredients are used together, and find
          unique combinations.
          <br />
          <br />
          You can find the code for this website on my GitHub.
        </p>
      </section>
    </>
  );
};

export default Recipe;
