"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import colleges from '../data/collge';

const AdmissionPage = () => {
  const router = useRouter();
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    image: null
  });

  const handleCollegeSelect = (college) => {
    setSelectedCollege(college);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Applying to:', selectedCollege.name);
    console.log('Form data:', formData);
    alert(`Application submitted to ${selectedCollege.name}!`);
    router.push('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">College Admission Portal</h1>
      
      {!selectedCollege ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <h2 className="col-span-full text-xl font-semibold mb-4">Select a College to Apply</h2>
          {colleges.map(college => (
            <div 
              key={college.id}
              onClick={() => handleCollegeSelect(college)}
              className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="flex items-center space-x-4">
                <img 
                  src={college.image} 
                  alt={college.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold">{college.name}</h3>
                  <p className="text-sm text-gray-600">Admission: {college.admissionDates}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white text-g p-5">
            
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Application to {selectedCollege.name}</h2>
            <button 
              onClick={() => setSelectedCollege(null)}
              className="text-blue-600 hover:underline"
            >
              Change College
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject/Program</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Passport Photo</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  accept="image/*"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdmissionPage;