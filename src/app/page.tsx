import { PageNavigation } from "@/components/page-navigation/PageNavigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#162542] flex flex-col">
      {/* Main content area */}
      <div className="flex-1 px-6 py-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-50 rounded-xl p-8 text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Form Builder
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Create beautiful forms with our intuitive form builder. Navigate
              between different pages using the navigation at the bottom of the
              screen.
            </p>
          </div>

          {/* Form content area */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 min-h-96 relative">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Form Content Area
              </h2>
              <p className="text-gray-600 mb-6">
                This is where your form content would appear.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Drag & Drop
                  </h3>
                  <p className="text-sm text-gray-600">
                    Reorder pages by dragging tabs
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Context Menu
                  </h3>
                  <p className="text-sm text-gray-600">
                    Click the three dots for options
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Add Pages</h3>
                  <p className="text-sm text-gray-600">
                    Hover between tabs to add new pages
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg z-10">
        <PageNavigation />
      </div>
    </div>
  );
}
