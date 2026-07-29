import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://khorrum.pro.bd";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin.khorrum",
          "/api/",
          "/birthday",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
