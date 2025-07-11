"use client";
import React from "react";
import researchPapers from "../data/research";

const ResearchLinks = () => {
    return (
        <section className="w-10/12 mx-auto py-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 ">Research Papers</h2>

            <div className="grid gap-6 ">
                {researchPapers.map((paper) => (
                    <div
                        key={paper.id}
                        className="bg-white shadow-md rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center transition hover:shadow-lg"
                    >
                        <div className="flex-1">
                            <p className="text-sm text-gray-500 font-medium">{paper.subtitle}</p>
                            <h3 className="text-lg font-semibold text-gray-800">{paper.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{paper.description}</p>
                            <a
                                href={paper.link}
                                className="inline-block mt-3 bg-gray-100 text-sm text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
                            >
                                Read More
                            </a>
                        </div>
                        <img
                            src={paper.imageUrl}
                            alt={paper.title}
                            className="w-[400px]  h-50 object-cover rounded-lg mt-4 md:mt-0 md:ml-6"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ResearchLinks;
