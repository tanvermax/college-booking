"use client";
import React from "react";
import { FaStar, FaRegComment, FaRegThumbsUp } from "react-icons/fa";
import reviews from "../data/review";

const Reviews = () => {
  return (
    <section className="w-10/12 mx-auto py-12 ">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 ">Reviews</h2>

      <div className="space-y-6 p-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 bg-white p-4 rounded-md">
            <div className="flex items-center gap-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>

            <div className="mt-3 flex items-center text-yellow-500">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
              {[...Array(5 - review.rating)].map((_, i) => (
                <FaStar key={i} className="text-gray-300" />
              ))}
            </div>

            <p className="mt-2 text-gray-800 text-sm">{review.content}</p>

            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <FaRegThumbsUp /> {review.likes}
              </div>
              <div className="flex items-center gap-1">
                <FaRegComment /> {review.comments}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
