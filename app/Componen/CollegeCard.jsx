"use client";
import React from "react";
import colleges from "../data/collgesData";

const CollegeCard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-10/12 mx-auto py-8">
            {colleges.map((college) => (
                <div key={college.id} className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition">
                    <img src={college.image} alt={college.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h2 className="text-xl font-bold text-gray-800">{college.name}</h2>
                        <p className="text-sm text-gray-500 mb-2"><strong>Admission:</strong> {college.admissionDates}</p>
                        <p className="text-sm text-gray-600 mb-2"><strong>Events:</strong></p>
                        <ul className="list-disc ml-5 text-sm text-gray-500">
                            {college.events.map((event, i) => (
                                <li key={i}>{event}</li>
                            ))}
                        </ul>
                        <p className="mt-2 text-sm text-gray-600"><strong>Research:</strong> {college.researchHistory}</p>
                        <p className="mt-2 text-sm text-gray-600"><strong>Sports:</strong> {college.sports.join(", ")}</p>
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CollegeCard;
