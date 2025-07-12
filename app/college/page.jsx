"use client";
import { useRouter } from "next/navigation";
import colleges from "../data/collge";


const CollegeCard = () => {
    const router = useRouter();

    const handleDetails = (collegeId) => {
        router.push(`/collegedetail/${collegeId}`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Colleges</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {colleges.map((college) => (
                    <div
                        key={college.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="relative h-48">
                            <img
                                src={college.image}
                                alt={college.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-1 font-medium text-gray-900">{college.rating}</span>
                            </div>
                        </div>

                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{college.name}</h2>

                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <p className="text-sm text-gray-600">Admission</p>
                                    <p className="text-sm font-medium text-gray-800">{college.admissionDates}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600">Research Papers</p>
                                    <p className="text-sm font-medium text-gray-800">{college.researchCount}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDetails(college.id)}
                                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollegeCard;