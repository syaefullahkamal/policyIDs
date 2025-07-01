import React from 'react';
import { Filter, SortAsc, SortDesc } from 'lucide-react';

interface FilterBarProps {
  sortBy: 'name' | 'policies';
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: 'name' | 'policies', sortOrder: 'asc' | 'desc') => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  sortBy,
  sortOrder,
  onSortChange,
  totalResults
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center space-x-4">
        <Filter className="w-5 h-5 text-gray-400" />
        <span className="text-sm text-gray-600">
          {totalResults.toLocaleString()} {totalResults === 1 ? 'project' : 'projects'} found
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as 'name' | 'policies', sortOrder)}
          className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-cardano-500 focus:border-transparent"
        >
          <option value="name">Project Name</option>
          <option value="policies">Policy Count</option>
        </select>
        
        <button
          onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
          className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
          title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
        >
          {sortOrder === 'asc' ? (
            <SortAsc className="w-4 h-4" />
          ) : (
            <SortDesc className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};