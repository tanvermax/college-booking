"use client";
import React, { useEffect, useState } from "react";
import { FaStar, FaRegComment, FaRegThumbsUp } from "react-icons/fa";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/apply");
      console.log(response.data.reviews, "Fetched reviews data");
      // Assuming the response data has a reviews array
      setReviews(response.data.reviews || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch reviews. Please try again later.");
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchReviews();
  }, []);

  // Auto-update every 30 seconds (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchReviews();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="w-10/12 mx-auto py-12">Loading reviews...</div>;
  }

  if (error) {
    return <div className="w-10/12 mx-auto py-12 text-red-500">{error}</div>;
  }

  if (reviews.length == 0) {
    return <div className="w-10/12 mx-auto py-12">No reviews yet.</div>;
  }

  return (
    <section className="w-10/12 mx-auto py-12 ">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 ">Reviews</h2>

      <div className="space-y-6 p-8">
        {reviews.map((review) => (
          <div key={review._id} className="border-b pb-6 bg-white p-4 rounded-md">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600">
                  {review.name ? review.name.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{review.name || "Anonymous"}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt?.$date || review.createdAt).toLocaleDateString()}
                </p>
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

            <p className="mt-2 text-gray-800 text-sm">{review.comment}</p>

            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <FaRegThumbsUp /> 0 {/* You can add likes to your schema if needed */}
              </div>
              <div className="flex items-center gap-1">
                <FaRegComment /> 0 {/* You can add comments to your schema if needed */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;