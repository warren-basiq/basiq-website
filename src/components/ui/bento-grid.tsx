import { cn } from "../../lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  link,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  link?: string;
}) => {
  const Wrapper = link ? "a" : "div";
  const wrapperProps = link ? { href: link } : {};
  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition duration-300 hover:border-amber-400/20 hover:bg-white/[0.04]",
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-bold text-[#e8e5e0]">
          {title}
        </div>
        <div className="font-body text-xs font-normal text-[#a09d97]">
          {description}
        </div>
      </div>
    </Wrapper>
  );
};
