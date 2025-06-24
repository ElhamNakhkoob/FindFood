import db from "../../../database/db.json";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const per_page = parseInt(searchParams.get("per_page") || "10", 10);
  const title = searchParams.get("title") || "";

  let products = db.products;

  if (title) {
    products = products.filter((product) =>
      product.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  const startIndex = (page - 1) * per_page;
  const endIndex = startIndex + per_page;

  const paginatedProducts = products.slice(startIndex, endIndex);

  return new Response(
    JSON.stringify({
      data: paginatedProducts,
      total: products.length,
      page,
      per_page,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
