export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 border-t-2 border-r-2 border-[#f97316] rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-b-2 border-l-2 border-white rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
        </div>
        <div className="font-['Anton'] text-xl tracking-widest text-white animate-pulse">
          LOADING<span className="text-[#f97316]">...</span>
        </div>
      </div>
    </div>
  );
}

