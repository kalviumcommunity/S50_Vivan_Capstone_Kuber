const LoadingSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button Skeleton */}
      <div className="mb-8 h-6 w-32 bg-gray-200 rounded-full animate-pulse"></div>
  
      {/* Main Content Skeleton */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Image Section Skeleton */}
        <div className="lg:w-1/2 bg-gray-100 p-8">
          <div className="aspect-w-1 aspect-h-1">
            <div className="w-full h-full bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
  
        {/* Details Section Skeleton */}
        <div className="lg:w-1/2 p-8 space-y-6">
          {/* Title Skeleton */}
          <div className="h-10 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
          
          {/* Description Skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded-full w-full"></div>
            <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded-full w-4/6"></div>
          </div>
  
          {/* Price & Date Skeleton */}
          <div className="flex items-center space-x-4">
            <div className="h-12 bg-gray-200 rounded-full w-32"></div>
            <div className="h-8 bg-gray-200 rounded-full w-48"></div>
          </div>
  
          {/* Buttons Skeleton */}
          <div className="flex space-x-4">
            <div className="h-12 bg-gray-200 rounded-full w-48"></div>
            <div className="h-12 bg-gray-200 rounded-full w-48"></div>
          </div>
  
          {/* Coupon Code Skeleton */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-4">
            <div className="h-4 bg-gray-200 rounded-full w-24"></div>
            <div className="h-8 bg-gray-200 rounded-full w-64"></div>
          </div>
  
          {/* Seller Info Skeleton */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded-full w-32"></div>
                <div className="h-3 bg-gray-200 rounded-full w-48"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Additional Details Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm space-y-2">
            <div className="h-4 bg-gray-200 rounded-full w-24"></div>
            <div className="h-6 bg-gray-200 rounded-full w-36"></div>
          </div>
        ))}
      </div>
    </div>
  );
  
  export default LoadingSkeleton;