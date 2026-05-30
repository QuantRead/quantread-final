import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://quantread.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://quantread.app/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://quantread.app/blog/the-day-swing-mode-found-its-shape",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.86,
    },
    {
      url: "https://quantread.app/blog/four-green-receipts-one-honest-autopsy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: "https://quantread.app/blog/from-dirty-winner-to-coherent-edge",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: "https://quantread.app/blog/the-day-the-system-closed-the-loop",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://quantread.app/blog/the-dna-of-a-winner",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: "https://quantread.app/blog/what-a-bad-market-open-taught-us-about-building-a-trading-bot",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: "https://quantread.app/blog/how-do-i-know-if-a-stock-is-actually-a-good-day-trade-setup",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://quantread.app/indicators",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
