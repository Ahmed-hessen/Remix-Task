interface HeadingProps {
  title: string;
  center?: boolean;
}

export default function Heading({ title, center }: HeadingProps) {
  return (
    <div className={center ? "text-center" : " text-start"}>
      <h1 className="font-bold text-4xl mb-10 mt-5">{title}</h1>
    </div>
  );
}
