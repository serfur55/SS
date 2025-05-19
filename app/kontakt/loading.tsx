import { Skeleton } from "@/components/ui/skeleton"
import ShopifyLayout from "@/components/shopify-layout"

export default function LoadingPage() {
  return (
    <ShopifyLayout>
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4 bg-gray-800" />
            <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-3/4 max-w-2xl mx-auto bg-gray-800" />
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-lg">
                <div className="flex flex-col items-center text-center">
                  <Skeleton className="w-16 h-16 rounded-full bg-gray-800 mb-4" />
                  <Skeleton className="h-6 w-32 bg-gray-800 mb-2" />
                  <Skeleton className="h-4 w-48 bg-gray-800 mb-4" />
                  <Skeleton className="h-10 w-full bg-gray-800 mt-auto" />
                </div>
              </div>
            ))}
          </div>

          {/* Location Section */}
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-12">
            <div className="p-6">
              <Skeleton className="h-8 w-48 bg-gray-800 mb-4" />
              <div className="flex items-start mb-4">
                <Skeleton className="h-5 w-5 bg-gray-800 mr-3" />
                <Skeleton className="h-5 w-48 bg-gray-800" />
              </div>
            </div>
            <Skeleton className="h-[400px] w-full bg-gray-800" />
          </div>

          {/* Social Media */}
          <div className="text-center">
            <Skeleton className="h-8 w-40 mx-auto bg-gray-800 mb-6" />
            <div className="flex justify-center space-x-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-14 h-14 rounded-full bg-gray-800" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ShopifyLayout>
  )
}
