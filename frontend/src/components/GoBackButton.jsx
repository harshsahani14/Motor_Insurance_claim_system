import React from 'react'
import { useNavigate } from 'react-router-dom'

const GoBackButton = ({ path }) => {

    const navigate = useNavigate();

  return (
    <button className="px-4 py-2 border bg-black text-white  rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => navigate( path || -1 )}
            >
    Go back
    </button>
  )
}

export default GoBackButton