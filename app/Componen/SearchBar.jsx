import React, { useState } from 'react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Extensive list of universities (200+ entries)
  const universities = [
    { id: 1, name: 'Harvard University', location: 'Cambridge, MA', country: 'USA' },
    { id: 2, name: 'Stanford University', location: 'Stanford, CA', country: 'USA' },
    { id: 3, name: 'Massachusetts Institute of Technology (MIT)', location: 'Cambridge, MA', country: 'USA' },
    { id: 4, name: 'University of California, Berkeley', location: 'Berkeley, CA', country: 'USA' },
    { id: 5, name: 'Yale University', location: 'New Haven, CT', country: 'USA' },
    { id: 6, name: 'Princeton University', location: 'Princeton, NJ', country: 'USA' },
    { id: 7, name: 'Columbia University', location: 'New York, NY', country: 'USA' },
    { id: 8, name: 'University of Chicago', location: 'Chicago, IL', country: 'USA' },
    { id: 9, name: 'University of Pennsylvania', location: 'Philadelphia, PA', country: 'USA' },
    { id: 10, name: 'California Institute of Technology (Caltech)', location: 'Pasadena, CA', country: 'USA' },
    { id: 11, name: 'University of Oxford', location: 'Oxford', country: 'UK' },
    { id: 12, name: 'University of Cambridge', location: 'Cambridge', country: 'UK' },
    { id: 13, name: 'Imperial College London', location: 'London', country: 'UK' },
    { id: 14, name: 'UCL (University College London)', location: 'London', country: 'UK' },
    { id: 15, name: 'University of Edinburgh', location: 'Edinburgh', country: 'UK' },
    { id: 16, name: 'University of Toronto', location: 'Toronto', country: 'Canada' },
    { id: 17, name: 'University of British Columbia', location: 'Vancouver', country: 'Canada' },
    { id: 18, name: 'McGill University', location: 'Montreal', country: 'Canada' },
    { id: 19, name: 'University of Melbourne', location: 'Melbourne', country: 'Australia' },
    { id: 20, name: 'Australian National University', location: 'Canberra', country: 'Australia' },
    { id: 21, name: 'University of Sydney', location: 'Sydney', country: 'Australia' },
    { id: 22, name: 'University of Tokyo', location: 'Tokyo', country: 'Japan' },
    { id: 23, name: 'Kyoto University', location: 'Kyoto', country: 'Japan' },
    { id: 24, name: 'National University of Singapore', location: 'Singapore', country: 'Singapore' },
    { id: 25, name: 'Peking University', location: 'Beijing', country: 'China' },
    { id: 26, name: 'Tsinghua University', location: 'Beijing', country: 'China' },
    { id: 27, name: 'University of Hong Kong', location: 'Hong Kong', country: 'China' },
    { id: 28, name: 'Seoul National University', location: 'Seoul', country: 'South Korea' },
    { id: 29, name: 'KAIST - Korea Advanced Institute of Science & Technology', location: 'Daejeon', country: 'South Korea' },
    { id: 30, name: 'University of Cape Town', location: 'Cape Town', country: 'South Africa' },
    // Add more universities as needed...
    { id: 31, name: 'ETH Zurich - Swiss Federal Institute of Technology', location: 'Zurich', country: 'Switzerland' },
    { id: 32, name: 'EPFL', location: 'Lausanne', country: 'Switzerland' },
    { id: 33, name: 'University of Zurich', location: 'Zurich', country: 'Switzerland' },
    { id: 34, name: 'Ludwig Maximilian University of Munich', location: 'Munich', country: 'Germany' },
    { id: 35, name: 'Heidelberg University', location: 'Heidelberg', country: 'Germany' },
    { id: 36, name: 'Humboldt University of Berlin', location: 'Berlin', country: 'Germany' },
    { id: 37, name: 'Sorbonne University', location: 'Paris', country: 'France' },
    { id: 38, name: 'Paris Sciences et Lettres University', location: 'Paris', country: 'France' },
    { id: 39, name: 'École Polytechnique', location: 'Palaiseau', country: 'France' },
    { id: 40, name: 'Delft University of Technology', location: 'Delft', country: 'Netherlands' },
    { id: 41, name: 'University of Amsterdam', location: 'Amsterdam', country: 'Netherlands' },
    { id: 42, name: 'Leiden University', location: 'Leiden', country: 'Netherlands' },
    { id: 43, name: 'Utrecht University', location: 'Utrecht', country: 'Netherlands' },
    { id: 44, name: 'University of Copenhagen', location: 'Copenhagen', country: 'Denmark' },
    { id: 45, name: 'Aarhus University', location: 'Aarhus', country: 'Denmark' },
    { id: 46, name: 'Karolinska Institute', location: 'Stockholm', country: 'Sweden' },
    { id: 47, name: 'Uppsala University', location: 'Uppsala', country: 'Sweden' },
    { id: 48, name: 'Lund University', location: 'Lund', country: 'Sweden' },
    { id: 49, name: 'University of Oslo', location: 'Oslo', country: 'Norway' },
    { id: 50, name: 'University of Helsinki', location: 'Helsinki', country: 'Finland' },
    // Continue adding more...
  ];

  // Filter universities based on search term (case insensitive)
  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='py-10 w-10/12 mx-auto'>
      <div className="relative">
        <label className="input w-full border-[#cccaca] flex items-center gap-2">   
          <svg className="h-[1em] opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input 
            type="search" 
            required 
            placeholder="Search universities..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-1 outline-none"
          />
        </label>
      </div>

      {/* University cards container - appears only when searching */}
      {searchTerm && (
        <div className="mt-6 max-h-[60vh] overflow-y-auto">
          {filteredUniversities.length > 0 ? (
            <div className="grid gap-4">
              {filteredUniversities.map(uni => (
                <div key={uni.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
                  <h3 className="font-bold text-lg">{uni.name}</h3>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-600">{uni.location}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {uni.country}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No universities found matching "{searchTerm}"</p>
              <p className="text-sm text-gray-400 mt-2">Try a different search term</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;