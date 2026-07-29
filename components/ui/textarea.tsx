import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "font-normal text-base text-[#4E4E4E] border border-gray-300 rounded-[15px] px-4 py-3 md:py-5 w-full focus:outline-none focus:ring-2 focus:ring-[#8A38F5] focus:border-transparent",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
