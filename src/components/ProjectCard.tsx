import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Tag } from 'lucide-react';
import { NFTProject } from '../types';

interface ProjectCardProps {
  project: NFTProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [copiedPolicy, setCopiedPolicy] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPolicy(text);
      setTimeout(() => setCopiedPolicy(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const openInPoolPM = (policyId: string) => {
    window.open(`https://pool.pm/policy/${policyId}`, '_blank');
  };

  return (
    <div className="card p-6">
      <div className="flex flex-col space-y-4">
        {/* Project Header */}
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {project.project}
          </h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {project.policies.length} {project.policies.length === 1 ? 'policy' : 'policies'}
          </span>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Tag className="w-4 h-4 text-gray-400 mt-1" />
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-cardano-50 text-cardano-700 px-2 py-1 rounded-md border border-cardano-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Policy IDs */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Policy IDs
          </h4>
          <div className="space-y-2">
            {project.policies.map((policy, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <code className="text-sm font-mono text-gray-800 break-all flex-1 mr-3">
                  {policy}
                </code>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => copyToClipboard(policy)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                    title="Copy policy ID"
                  >
                    {copiedPolicy === policy ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => openInPoolPM(policy)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                    title="View on pool.pm"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};