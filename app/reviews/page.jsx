// components/CollegeReviews.js
'use client';

import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

export default function CollegeReviews() {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedReview, setExpandedReview] = useState(null);

  // Mock review data
  const reviews = [
    {
      id: 1,
      author: 'Computer Science Student',
      rating: 4.5,
      date: '2 weeks ago',
      content: 'The CS program is rigorous but rewarding. Excellent faculty with industry experience. Campus facilities are top-notch, though housing can be expensive.',
      likes: 24,
      tags: ['Academics', 'Faculty'],
      verified: true
    },
    {
      id: 2,
      author: 'Biology Major',
      rating: 3.8,
      date: '1 month ago',
      content: 'Great research opportunities for undergrads. The lab equipment is modern and well-maintained. However, some intro classes are overcrowded which makes it hard to get individual attention.',
      likes: 18,
      tags: ['Research', 'Facilities'],
      verified: true
    },
    {
      id: 3,
      author: 'International Student',
      rating: 4.2,
      date: '3 months ago',
      content: 'The international student office is very supportive. Cultural clubs help with adjustment. Food options could be more diverse. Overall a great experience meeting people from around the world.',
      likes: 32,
      tags: ['Diversity', 'Student Life'],
      verified: false
    },
    {
      id: 4,
      author: 'Alumni (Class of 2020)',
      rating: 4.7,
      date: '5 months ago',
      content: 'The alumni network is incredibly strong and helped me land my first job. Career services could be more proactive though. I still visit campus often for networking events.',
      likes: 41,
      tags: ['Career Services', 'Alumni Network'],
      verified: true
    }
  ];

  // Filter reviews based on active tab
  const filteredReviews = activeTab === 'all' 
    ? reviews 
    : reviews.filter(review => review.tags.includes(activeTab));

  // Rating breakdown data
  const ratingData = {
    overall: 4.3,
    breakdown: [
      { category: 'Academics', rating: 4.5 },
      { category: 'Campus Life', rating: 4.1 },
      { category: 'Career Support', rating: 4.0 },
      { category: 'Diversity', rating: 4.4 },
      { category: 'Facilities', rating: 4.2 }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Student Reviews</h2>
        <div className="mt-2 flex items-center justify-center">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`h-6 w-6 ${
                  star <= Math.floor(ratingData.overall)
                    ? 'text-yellow-400'
                    : star === Math.ceil(ratingData.overall) && ratingData.overall % 1 >= 0.5
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-lg font-medium">
            {ratingData.overall} out of 5 ({reviews.length} reviews)
          </span>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Rating Breakdown</h3>
        <div className="space-y-3">
          {ratingData.breakdown.map((item) => (
            <div key={item.category} className="flex items-center">
              <span className="w-32 text-sm font-medium text-gray-600">{item.category}</span>
              <div className="flex-1 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(item.rating / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{item.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Tabs */}
      <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
        {['all', 'Academics', 'Faculty', 'Student Life', 'Facilities', 'Diversity'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between">
              <div>
                <h4 className="font-bold text-lg">{review.author}</h4>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-5 w-5 ${
                          star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                  {review.verified && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      Verified Student
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                {review.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className={`mt-3 text-gray-700 ${expandedReview === review.id ? '' : 'line-clamp-3'}`}>
              {review.content}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <button 
                onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                className="text-blue-600 text-sm font-medium"
              >
                {expandedReview === review.id ? 'Show less' : 'Read more'}
              </button>
              
              <div className="flex items-center space-x-2">
                <button className="text-gray-500 hover:text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                </button>
                <span className="text-sm text-gray-500">{review.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review CTA */}
      <div className="mt-10 text-center">
        <h3 className="text-xl font-semibold mb-2">Share Your Experience</h3>
        <p className="text-gray-600 mb-4">Help prospective students by writing a review</p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
          Write a Review
        </button>
      </div>
    </div>
  );
}