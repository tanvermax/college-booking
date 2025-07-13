"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyCollege() {
    const [collegeData, setCollegeData] = useState([]);
    const [review, setReview] = useState({ rating: 5, comment: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/apply');
                console.log("API response:", response.data);

                if (response.data.success) {
                    setCollegeData(response.data.data);
                } else {
                    console.error("Failed to fetch college data:", response.data.error);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    const handleReviewSubmit = async (e, college) => {
        e.preventDefault();
      
        
        try {
            const response = await axios.post('/api/review', {
                rating: review.rating,
                comment: review.comment,
                collegeId: college._id
            });

            if (response.data.success) {
                // Update local state with new review
                setCollegeData(prev => prev.map(c => 
                    c._id === college._id 
                        ? { 
                            ...c, 
                            reviews: [...(c.reviews || []), response.data.data.review] 
                          } 
                        : c
                ));
                
                setReview({ rating: 5, comment: '' });
                alert('Review submitted successfully!');
                console.log("Review submitted:", response.data.data.review);
            } else {
                setError(response.data.error || "Failed to submit review");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            setError(error.response?.data?.error || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="text-center py-8">Loading...</div>;
    if (!collegeData || collegeData.length === 0) return <div className="text-center py-8">No college data found</div>;

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">My College Application</h1>

            <div className="space-y-6">
                {collegeData.map((college, index) => (
                    <div key={college._id || index} className="border rounded-lg overflow-hidden">
                        <div className="p-6 bg-zinc-700">
                            <h2 className="text-xl font-semibold mb-4">Application Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-medium">College Name:</p>
                                    <p>{college.name}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Subject:</p>
                                    <p>{college.subject}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Email:</p>
                                    <p>{college.email}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Phone:</p>
                                    <p>{college.phone}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Address:</p>
                                    <p>{college.address}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Date of Birth:</p>
                                    <p>{new Date(college.dob).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-zinc-700">
                            <h2 className="text-xl font-semibold mb-4">Add a Review</h2>
                            <form onSubmit={(e) => handleReviewSubmit(e, college)} className="space-y-4">
                                <div>
                                    <label className="block mb-1">Rating</label>
                                    <select
                                        value={review.rating}
                                        onChange={(e) => setReview({...review, rating: Number(e.target.value)})}
                                        className="w-full p-2 border rounded"
                                        required
                                    >
                                        {[5, 4, 3, 2, 1].map((num) => (
                                            <option key={num} value={num}>
                                                {num} Star{num !== 1 ? 's' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1">Review Comment</label>
                                    <textarea
                                        value={review.comment}
                                        onChange={(e) => setReview({...review, comment: e.target.value})}
                                        className="w-full p-2 border rounded"
                                        rows={4}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Submit Review
                                </button>
                            </form>

                            {college.reviews?.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold mb-4">Reviews</h3>
                                    <div className="space-y-4">
                                        {college.reviews.map((rev, revIndex) => (
                                            <div key={revIndex} className="border-b pb-4">
                                                <div className="flex items-center mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`w-5 h-5 ${i < rev.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <p className="text-gray-700">{rev.comment}</p>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    {new Date(rev.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}