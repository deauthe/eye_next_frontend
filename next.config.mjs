/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // Handle canvas module
    return config;
  },


	images: {
		domains: [
			"res.cloudinary.com",
			"images.unsplash.com",
			"source.unsplash.com",
		],
	},

};

export default nextConfig;
