import { revalidateTag } from "next/cache";

interface Product {
    id?: string,
    product: string,
    price: string
}

export default async function Test() {
    const res = await fetch('https://64bb442b5e0670a501d6e627.mockapi.io/api/v1/products',{
       
        next: {
            tags: ["product"]
        }
    })
    const products : Product[] = await res.json();

    const addProductToDatabase = async (e: FormData) => {
        "use server"
        const product = e.get("product")?.toString();
        const price = e.get("price")?.toString();
        if(!product || !price) return;
        const newProduct : Product ={
            product,
            price
        }

        await fetch('https://64bb442b5e0670a501d6e627.mockapi.io/api/v1/products',{
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                "Content-Type": "application/json"
            }
        })
        e.set("product","");
        e.set("price","");
        revalidateTag("product")
    }
  return (
    <div>
      <h1> Hello, here I will test server actions </h1>
      <form action={addProductToDatabase} className="flex flex-col gap-5 max-w-xl mx-auto ">
        <input name="product" type="text" placeholder="product" className="rounded-lg p-3 ml-3  border "  />
        <input name="price"  type="text" placeholder="price" className="rounded-lg p-3 ml-3 border"  />
        <button type="submit" className="rounded-lg p-3 ml-3 text-teal-500 bg-slate-300"> Add product </button>
      </form>

      <div className="flex flex-wrap gap-2 mt-3 p-3" >
        {
            products.map((product) => {
                return (
                    <div key={product.id} className="p-2 border border-gray-400 ">
                        <h1 className="text-lg font-semibold" > {product.product} </h1>
                        <p className="text-sm"> Rs. {product.price} </p>
                    </div>
                )
            })
        }
      </div>
    </div>
  );
}
