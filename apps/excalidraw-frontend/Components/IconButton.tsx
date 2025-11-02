import { ReactNode } from "react";

export function IconButton({
  Icon,
  onClick,
  activated,
}: {
  Icon: ReactNode;
  onClick: () => void;
  activated: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border-2 p-2 flex items-center justify-center transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 ${
        activated
          ? "bg-[#6965db] text-white border-[#6965db]"
          : "bg-white text-[#2d3748] border-[#6965db]/40 hover:bg-[#f7f7ff]"
      }`}
      title="Tool"
    >
      {Icon}
    </div>
  );
}
