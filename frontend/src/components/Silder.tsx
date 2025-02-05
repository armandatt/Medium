import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Category {
  id?: number;
  name: string;
}

const Slider: React.FC = () => {
  const categories: Category[] = [
    { id: 0 , name: 'For You' },
    { id: -1 , name: 'Following' },
    { id: 1, name: 'React' },
    { id: 2, name: 'DevOps' },
    { id: 3, name: 'MachineLearning' },
    { id: 4, name: 'Physcology' },
    { id: 5, name: 'Trading' },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setActiveId(id);
    navigate(`/blog/${id}`); 
  };

  return (
    <div className="bg-white p-4 flex justify-center">
      <ul className="flex gap-6 overflow-x-auto whitespace-nowrap">
        {categories.map((category, index) => {
          const categoryId = category.id;
          return (
            <li
              key={categoryId ?? index}
              id={categoryId ? `cat-${categoryId}` : `cat-${index}`}
              onClick={() => categoryId && handleClick(categoryId)}
              className={`cursor-pointer text-lg font-bold transition-colors duration-300 ${
                activeId === categoryId || location.pathname === `/blog/${categoryId}`
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-800 hover:text-blue-500'
              }`}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Slider;

