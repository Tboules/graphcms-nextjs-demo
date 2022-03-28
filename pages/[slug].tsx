import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import client from "../apollo-client";

export default function CategoryPage(props: any) {
  console.log(props);

  return <h1>hello</h1>;
}

const pathQuery = gql`
  query Pages {
    categories {
      slug
    }
  }
`;

const categoryQuery = gql`
  query CategoryPage($slug: String) {
    category(where: { slug: $slug }) {
      title
      slug
      items {
        ... on Quote {
          id
          author
          slug
          title
          body {
            text
          }
        }
        ... on Icon {
          id
          image {
            url
          }
          slug
          title
          description {
            text
          }
        }
      }
    }
  }
`;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log("hello", params?.slug);

  const { data } = await client.query({
    query: categoryQuery,
    variables: {
      slug: params?.slug,
    },
  });

  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: { data: { categories: Category[] } } = await client.query({
    query: pathQuery,
  });

  return {
    paths: data.categories.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
};
