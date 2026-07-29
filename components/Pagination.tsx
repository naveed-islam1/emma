import clsx from "clsx";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* PREV */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(Number(page) - 1)}
        className={clsx(
          "px-3 py-1 rounded border text-sm",
          page === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"
        )}
      >
        Prev
      </button>

      {/* PAGES */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={clsx(
            "px-3 py-1 rounded border text-sm",
            p == page ? "bg-black text-white" : "hover:bg-gray-100"
          )}
        >
          {p}
        </button>
      ))}

      {/* NEXT */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(Number(page) + 1)}
        className={clsx(
          "px-3 py-1 rounded border text-sm",
          page === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100"
        )}
      >
        Next
      </button>
    </div>
  );
}
