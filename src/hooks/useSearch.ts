import { useMemo } from 'react';
import { NFTProject } from '../types';

export const useSearch = (
  projects: NFTProject[],
  searchTerm: string,
  sortBy: 'name' | 'policies' = 'name',
  sortOrder: 'asc' | 'desc' = 'asc'
) => {
  return useMemo(() => {
    let filtered = projects;

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = projects.filter(project => {
        // Search in project name
        if (project.project.toLowerCase().includes(term)) return true;
        
        // Search in tags
        if (project.tags?.some(tag => tag.toLowerCase().includes(term))) return true;
        
        // Search in policy IDs
        if (project.policies.some(policy => policy.toLowerCase().includes(term))) return true;
        
        return false;
      });
    }

    // Sort results
    filtered.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'name') {
        comparison = a.project.localeCompare(b.project);
      } else if (sortBy === 'policies') {
        comparison = a.policies.length - b.policies.length;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [projects, searchTerm, sortBy, sortOrder]);
};