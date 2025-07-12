"use client";
import colleges from '@/app/data/collge';
import { useParams } from 'next/navigation';


const CollegeDetails = () => {
    const params = useParams();
    const college = colleges.find(c => c.id == params.id);

    if (!college) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-gray-600">College not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Hero Section */}
                <div className="relative h-96">
                    <img
                        src={college.image}
                        alt={college.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white">{college.name}</h1>
                            <div className="flex items-center mt-2">
                                <div className="flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="ml-1 font-medium text-white">{college.rating}/5.0</span>
                                </div>
                                <span className="ml-4 text-white">{college.location}</span>
                                <span className="ml-4 text-white">Est. {college.established}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-8 grid md:grid-cols-2 gap-12">
                    {/* Left Column */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">About the College</h2>
                        <p className="text-gray-700 mb-8 text-lg">{college.description}</p>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Admission Information</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium text-gray-700">Admission Dates:</p>
                                <p className="text-gray-600 mb-3">{college.admissionDates}</p>
                                <p className="font-medium text-gray-700">Research Publications:</p>
                                <p className="text-gray-600">{college.researchCount} papers published</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h3>
                            <div className="space-y-3">
                                {college.events.map((event, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                                        <p className="text-gray-800">{event}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Sports Facilities</h3>
                            <div className="flex flex-wrap gap-3">
                                {college.sports.map((sport, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium"
                                    >
                                        {sport}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegeDetails;