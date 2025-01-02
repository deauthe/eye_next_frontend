import React from "react";
import { Button } from "../ui/button";

type Props = {};

const LoadMoreButton = (props: Props) => {
	return (
		<Button className="bg-gray-800 text-white rounded-full">
			load more products
		</Button>
	);
};

export default LoadMoreButton;
