import * as React from "react";

import { cn } from "@/lib/utils";
import { GrFormViewHide } from "react-icons/gr";
import { MdOutlineVisibility } from "react-icons/md";
import Image from "next/image";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = "text", ...props },
  ref
) {
  const [show, setShow] = React.useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className={cn("relative w-full", className ? "" : "")}>
      <input
        ref={ref}
        type={inputType}
        data-slot="input"
        className={cn(
          "font-normal text-base text-[#4E4E4E] border border-gray-300 rounded-[15px] px-4 py-3 md:py-5 w-full focus:outline-none focus:ring-2 focus:ring-[#8A38F5] focus:border-transparent",
          // remove duplicate width when wrapper handles it
          className
        )}
        {...props}
      />

      {isPassword ? (
        <button
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]"
        >
          {show ? (
            <MdOutlineVisibility size={20} />
          ) : (
            <Image src={"/assets/svg/eyes.svg"} alt="" width={17} height={8} />
          )}
        </button>
      ) : null}
    </div>
  );
});

export { Input };
