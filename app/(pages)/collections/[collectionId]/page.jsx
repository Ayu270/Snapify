import { ProductCard } from "@/app/components/Products";
import { getCollection } from "@/lib/firestore/collections/read_server";
import { getProduct } from "@/lib/firestore/products/read_server";

export async function generateMetadata({ params }) {
  const { collectionId } = params;
  const collection = await getCollection({ id: collectionId });

  return {
    title: `${collection?.title} | Collection`,
    description: collection?.subTitle ?? "",
    openGraph: {
      images: [collection?.imageURL],
    },
  };
}

export default async function Page({ params }) {
  const { collectionId } = params;
  const collection = await getCollection({ id: collectionId });
  return (
    <main className="flex justify-center p-5 md:px-10 md:py-5 w-full">
      <div className="max-w-7xl w-full">
        <div className="w-full flex justify-center">
          <img className="h-[150px]" src={collection?.imageURL} alt="" />
        </div>
        <h1 className="text-center font-semibold text-4xl p-2">
          {collection.title}
        </h1>
        <h1 className="text-center text-gray-500 p-4">{collection.subTitle}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collection?.products?.map((productId) => {
            return <Product productId={productId} key={productId} />;
          })}
        </div>
      </div>
    </main>
  );
}

async function Product({ productId }) {
  const product = await getProduct({ id: productId });
  return <ProductCard product={product} />;
}