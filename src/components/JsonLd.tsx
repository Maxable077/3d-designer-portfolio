type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

function stripContext(item: Record<string, unknown>) {
  const { ["@context"]: _context, ...rest } = item;
  return rest;
}

export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data)
    ? {
        "@context": "https://schema.org",
        "@graph": data.map((item) => stripContext(item)),
      }
    : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
