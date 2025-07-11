import React from 'react'

function SearchBar() {
    return (
        <div className='py-10 w-10/12 mx-auto '>
            <label className="input w-full border-[#cccaca]">   
                <svg className="h-[1em]  opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                <input type="search" required placeholder="Search" />
            </label>
        </div>
    )
}

export default SearchBar