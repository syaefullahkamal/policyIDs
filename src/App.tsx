import React, { useState } from 'react';
import { Database, Shield, Layers, Hash } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { ProjectCard } from './components/ProjectCard';
import { StatsCard } from './components/StatsCard';
import { FilterBar } from './components/FilterBar';
import { useSearch } from './hooks/useSearch';
import { projectsData } from './data/projects';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'policies'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredProjects = useSearch(projectsData, searchTerm, sortBy, sortOrder);

  const totalPolicies = projectsData.reduce((sum, project) => sum + project.policies.length, 0);
  const totalTags = projectsData.reduce((sum, project) => sum + (project.tags?.length || 0), 0);

  const handleSortChange = (newSortBy: 'name' | 'policies', newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cardano-100 rounded-lg">
                <Database className="w-8 h-8 text-cardano-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Cardano NFT Policy Database
                </h1>
                <p className="text-gray-600 mt-1">
                  Verified policy IDs for Cardano NFT projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search projects, tags, or policy IDs..."
          />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Projects"
            value={projectsData.length}
            icon={Layers}
            description="Verified NFT projects"
          />
          <StatsCard
            title="Policy IDs"
            value={totalPolicies}
            icon={Shield}
            description="Verified policy identifiers"
          />
          <StatsCard
            title="Tags"
            value={totalTags}
            icon={Hash}
            description="Classification tags"
          />
        </div>

        {/* Filter Bar */}
        <div className="mb-6">
          <FilterBar
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            totalResults={filteredProjects.length}
          />
        </div>

        {/* Results */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or browse all projects.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={`${project.project}-${index}`} project={project} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Cardano NFT Policy Database - Helping verify authentic NFT projects
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Always verify policy IDs before making any transactions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;