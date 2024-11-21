"use client";
import { staticProducts } from "@/helpers/staticFiles/staticProducts";
import ProductCard from "@/components/mainComponents/ProductCard";
import { Button } from "@/components/ui/button";
import HeroBanner from "@/components/Home/HeroBanner";
import { PageType, ProductCardProps } from "@/types/types";
import { useState } from "react";

export default function Page({ params }: { params: { category: string } }) {
	const category = params.category;
	const [page, setPage] = useState<PageType>({
		currentPage: 0,
		totalPages: 10,
	});
	const [products, setProducts] = useState<ProductCardProps>();
	const loadMoreProducts = () => { };

	return (
		<div>
			<div>
				<HeroBanner />
			</div>
			<div className="px-44">
				{/* products area start */}
				<div className="lg:grid lg:grid-cols-4 lg:gap-5 mt-24 mx-auto">
					{staticProducts.map((item, index) =>
						[1, 2, 3, 4, 5].map((dummy, index) => {
							return <ProductCard key={index} {...item} />;
						})
					)}

					{/* Additional divs or components can be added here */}
					<div className="col-span-3">
						{" "}
						{/* Content for the col-span-3 div */}
					</div>
				</div>
				{/* products area end */}

				{/* total products info  */}
				<div className="h-44 mx-auto w-fit flex flex-col gap-5">
					<div className="mx-auto">showing 9 out of 36 products</div>
					{/* loading bar  */}
					<div className="border-[1px] w-[200px] rounded-full h-2 border-black/[0.3] mx-auto bg-transparent">
						<div className="bg-black/[0.6] rounded-full w-1/2 h-full"></div>
					</div>
					<button
						onClick={loadMoreProducts}
						className="du-btn du-btn-secondary rounded-full "
					>
						load more products
					</button>
				</div>
			</div>
		</div>
	);
}
