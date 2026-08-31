export function SectionHeading({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      <p className="section-kicker">{kicker}</p>
      <h1 className="section-title">{title}</h1>
    </div>
  );
}
