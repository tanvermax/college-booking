"use client";
import React from "react";
import galleryImages from "../data/gallery";

const Gallery = () => {
    return (
        <section className="py-12  w-10/12 mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 py-5">
                College Graduates Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {galleryImages.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-lg shadow hover:shadow-lg overflow-hidden transition"
                    >
                        <img
                            src={item.imageUrl}
                            alt={item.caption}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-3  text-base text-center ">
                            {item.caption}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;
