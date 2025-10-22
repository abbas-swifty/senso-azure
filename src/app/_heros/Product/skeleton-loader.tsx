// SkeletonLoader.tsx
import React from 'react';

export const SkeletonLoader: React.FC = () => (
  <div className="skeleton-loader">
    <div className="skeleton-loader__image" />
    <div className="skeleton-loader__text" />
    <div className="skeleton-loader__text" />
    <div className="skeleton-loader__text" />
  </div>
);
