/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "d23zpyj32c5wn3.cloudfront.net",
      "cdn-img.oraimo.com", // added this domain
    ],
  },
};

export default nextConfig;
