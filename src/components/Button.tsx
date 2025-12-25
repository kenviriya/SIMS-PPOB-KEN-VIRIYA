export default function Button({
  loading,
  text,
}: {
  loading: boolean;
  text: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex w-full justify-center rounded-md border border-transparent bg-[#f42619] px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
    >
      {loading ? 'Loading...' : text}
    </button>
  );
}
