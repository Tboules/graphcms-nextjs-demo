import { gql } from "@apollo/client";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import client from "../apollo-client";

type Props = {
  pages: Category[];
};

const Home: NextPage<Props> = ({ pages }) => {
  return (
    <div className=" bg-slate-100">
      <div className="max-w-screen-lg m-auto h-screen w-100 flex justify-evenly items-center min-h-[600px] gap-4">
        {pages.map((page) => (
          <Link key={page.slug} href={page.slug} passHref>
            <button className="h-1/3 w-1/3 shadow-md rounded-md grid place-items-center bg-white ">
              <h1>{page.title}</h1>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

const QUERY = gql`
  query Pages {
    categories {
      title
      slug
    }
  }
`;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: QUERY,
  });

  return {
    props: {
      pages: data.categories,
    },
  };
};

export default Home;
