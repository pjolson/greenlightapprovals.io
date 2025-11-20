import { getCollection } from "astro:content";

export async function GET() {
  const docs = await getCollection("docsPublic");
  const payload = docs.map((doc) => ({
    title: doc.data.title,
    description: doc.data.description,
    section: doc.data.section,
    slug: doc.slug,
  }));

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
