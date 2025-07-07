
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminProfile } from '@/hooks/useAdminProfile';
import { Skeleton } from '@/components/ui/skeleton';

interface RequireAdminProps {
  children: React.ReactNode;
}

const RequireAdmin = ({ children }: RequireAdminProps) => {
  const { data, isLoading, error } = useAdminProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (error || (!isLoading && !data)) {
      navigate('/admin/login');
    }
  }, [error, isLoading, data, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return <>{children}</>;
};

export default RequireAdmin;
