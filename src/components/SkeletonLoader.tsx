// SkeletonLoader.tsx

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col px-3 max-w-7xl mx-auto w-full gap-9 pb-10 pt-4">
      {/* Placeholder for section 1 */}
      <div className="space-y-4">
        <div className="flex gap-1 text-2xl items-end">
          <div className="animate-pulse h-5 w-20 bg-gray-200 rounded"></div>
          <div className="animate-pulse h-5 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col justify-between gap-2 items-center font-semibold min-w-[150px] py-2">
            <div className="animate-pulse w-28 h-full bg-gray-200 rounded-full"></div>
            <div className="animate-pulse h-4 w-20 bg-gray-200 rounded"></div>
            <div className="animate-pulse h-4 w-20 bg-gray-200 rounded"></div>
          </div>
          <div className="flex overflow-x-auto w-full justify-between pr-3 py-2">
            <div className="flex flex-col justify-between gap-2 items-center font-semibold min-w-[150px] bg-gray-200 w-full">
              <div className="animate-pulse h-5 w-20 bg-gray-200 rounded"></div>
              <div className="animate-pulse h-24 w-24 bg-gray-200 rounded-full"></div>
              <div className="animate-pulse h-4 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col justify-between gap-2 items-center font-semibold min-w-[150px] py-2">
            <div className="animate-pulse w-40 h-full bg-gray-200 rounded"></div>
          </div>
          <div className="flex overflow-x-auto w-full justify-between pr-3 py-2">
            <div className="flex flex-col justify-between gap-2 items-center font-semibold min-w-[150px] bg-gray-200 w-full">
              <div className="animate-pulse h-12 w-20 bg-gray-200 rounded"></div>
              <div className="animate-pulse h-12 w-24 bg-gray-200 rounded-full"></div>
              <div className="animate-pulse h-12 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for section 2 */}
      <div className="flex flex-col w-full gap-4">
        <div className="animate-pulse h-5 w-20 bg-gray-200 rounded"></div>
        <div className="flex flex-col gap-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex gap-10">
              <div className="flex flex-col justify-between gap-2 items-center font-semibold min-w-[150px] py-2">
                <div className="animate-pulse w-40 h-full bg-gray-200 rounded"></div>
              </div>
              <div className="flex overflow-x-auto w-full justify-between pr-3 py-2">
                <div className="flex flex-col justify-between gap-2 items-center font-semibold min-w-[150px] bg-gray-200 w-full">
                  <div className="animate-pulse h-12 w-20 bg-gray-200 rounded"></div>
                  <div className="animate-pulse h-12 w-24 bg-gray-200 rounded-full"></div>
                  <div className="animate-pulse h-12 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
