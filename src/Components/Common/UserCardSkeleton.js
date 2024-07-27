import './UserCardSkeleton.css';

const UserCardSkeleton = () => (
  <div className="col-md-4 mb-4">
    <div className="card h-100 center shadow">
      <div className="d-flex justify-content-center mt-3 skeleton-image"></div>
      <div className="card-body">
        <div className="skeleton-title mb-2"></div>
        <div className="skeleton-text mb-1"></div>
        <div className="skeleton-text mb-1"></div>
        <div className="skeleton-text mb-1"></div>
        <div className="skeleton-text mb-1"></div>
        <div className="skeleton-text mb-1"></div>
        <div className="skeleton-text mb-1"></div>
        <div className="skeleton-text mb-1"></div>
        <div className="skeleton-text mb-1"></div>
        <div className="skeleton-text mb-1"></div>
        <div className="skeleton-text mb-1"></div>
        <div className="skeleton-text mb-1"></div>
      </div>
    </div>
  </div>
);

export default UserCardSkeleton;
