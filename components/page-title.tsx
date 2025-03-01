export default function PageTitle({
  subtitle,
  title,
}: {
  subtitle: string;
  title: string;
}) {
  return (
    <header className="mt-[3rem] mb-20 md:mb-40">
      <p className="uppercase text-sm font-light">{subtitle}</p>
      <h1 className="tracking-wide capitalize text-5xl md:text-7xl">{title}</h1>
    </header>
  );
}
