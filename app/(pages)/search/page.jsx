import { ProductCard } from "@/app/components/Products";
import { algoliasearch } from "algoliasearch";
import SearchBox from "./components/SearchBox";


export const metadata = {
    title: "Snapify | Search",
    description: "Created by Ayush",
};


const getProducts = async (text) => {
    if(!text) {
        return [];
    }
    const client = algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_API_ID,
        process.env.NEXT_PUBLIC_ALGOLIA_APP_KEY,
    );
    const search = await client.searchForHits({
        requests: [
            {
                indexName: "products",
                query: text,
                hitsPerPage: 20,
            },
        ],
    });
    const hits = search.results[0]?.hits;
    return hits ?? [];
};

export default async function Page({ searchParams }) {
    const { q } = searchParams;
    const products = await getProducts(q);

    return (
        <main className="flex flex-col gap-1 min-h-screen p-5">
            <SearchBox />
            {products?.length != 0 && (
            <div className="w-full flex justify-center p-6">
                <div className="max-w-7xl w-full">
                    <h1 className="text-center font-semibold text-xl p-4">Products for {q}</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                         {products?.map((item) => {
                          return <ProductCard product={item} key={item?.id} />;
                          })}
                    </div>
                </div>
            </div>
            )}
        </main>
    );
}