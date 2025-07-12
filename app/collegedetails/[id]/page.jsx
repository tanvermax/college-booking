"use client";
import colleges from "@/app/data/collgesData";
import { useParams } from "next/navigation";

const CollegeDetails = () => {
    const params = useParams();
    // console.log(params)
    const collegeId = parseInt(params.id);
    // console.log(collegeId)
    // console.log(colleges)
    const college = colleges.find(college => college.id == collegeId);
    // console.log(college)
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Section */}
        <div className="relative h-96">
          <img 
            src={college.image} 
            alt={college.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
            <h1 className="text-4xl font-bold text-white">{college.name}</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
            <p className="text-gray-700 mb-6">{college.description}</p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Admission</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Dates</h3>
              <p className="text-gray-600">{college.admissionDates}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Process</h3>
              <p className="text-gray-600">{college.admissionProcess}</p>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Events</h2>
            <ul className="space-y-3 mb-8">
              {college.events.map((event, index) => (
                <li key={index} className="bg-gray-50 p-3 text-gray-800 rounded-lg">
                  {event}
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Research</h2>
            <p className="text-gray-700 mb-8">{college.researchHistory}</p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sports</h2>
            <div className="flex flex-wrap gap-2">
              {college.sports.map((sport, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {sport}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default CollegeDetails;