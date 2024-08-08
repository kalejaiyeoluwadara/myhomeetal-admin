import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
function Welcome() {
  return (
    <div className="flex  items-center justify-between">
      <section>
        <h2 className="text-[24px] font-semibold ">All Products</h2>
      </section>
      <section>
        <Link href={"/dashboard/products/addproducts"}>
          <button className=" text-lg font-medium h-[50px] w-[300px] rounded-[99px] flex items-center justify-center gap-2 ">
            <CiShoppingCart className="text-white" size={30} />
            Add Product
          </button>
        </Link>
      </section>
    </div>
  );
}

export default Welcome;
