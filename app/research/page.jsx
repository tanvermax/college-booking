// app/research/page.js
export default function ResearchPage() {
    // Comprehensive research data (universities with research focus)
    const researchData = [
      {
        id: 1,
        name: "Quantum Computing Lab",
        university: "Massachusetts Institute of Technology",
        focus: "Quantum algorithms, Qubit stability",
        image: "/images/quantum-lab.jpg",
        stats: {
          papers: 142,
          patents: 28,
          funding: "$15.2M"
        }
      },
      {
        id: 2,
        name: "Neuroscience Research Center",
        university: "Stanford University",
        focus: "Brain-machine interfaces, Neurodegeneration",
        image: "/images/neuro-lab.jpg",
        stats: {
          papers: 89,
          patents: 17,
          funding: "$9.8M"
        }
      },
      {
        id: 3,
        name: "Sustainable Energy Institute",
        university: "ETH Zurich",
        focus: "Fusion energy, Photovoltaic materials",
        image: "/images/energy-lab.jpg",
        stats: {
          papers: 76,
          patents: 32,
          funding: "$22.1M"
        }
      },
      {
        id: 4,
        name: "CRISPR Genomics Facility",
        university: "University of California, Berkeley",
        focus: "Gene editing, Therapeutic applications",
        image: "/images/genomics-lab.jpg",
        stats: {
          papers: 204,
          patents: 41,
          funding: "$18.5M"
        }
      },
      {
        id: 5,
        name: "Space Exploration Center",
        university: "California Institute of Technology",
        focus: "Propulsion systems, Exoplanet detection",
        image: "/images/space-lab.jpg",
        stats: {
          papers: 117,
          patents: 23,
          funding: "$31.7M"
        }
      },
      {
        id: 6,
        name: "AI Research Hub",
        university: "University of Toronto",
        focus: "Deep learning, Ethical AI",
        image: "/images/ai-lab.jpg",
        stats: {
          papers: 165,
          patents: 19,
          funding: "$12.9M"
        }
      }
    ];
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Global Research Centers
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Exploring cutting-edge academic research worldwide
            </p>
          </div>
  
          {/* Research Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {researchData.map((research) => (
              <div
                key={research.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    {research.name}
                  </span>
                </div>
  
                {/* Card Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {research.name}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {research.university}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
  
                  <p className="mt-3 text-gray-600">
                    {research.focus}
                  </p>
  
                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-sm text-gray-500">Papers</p>
                      <p className="font-bold">{research.stats.papers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Patents</p>
                      <p className="font-bold">{research.stats.patents}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Funding</p>
                      <p className="font-bold">{research.stats.funding}</p>
                    </div>
                  </div>
  
                  {/* Action Button */}
                  <div className="mt-6">
                    <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      View Research
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Footer CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Want to feature your research center?
            </h2>
            <button className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    );
  }