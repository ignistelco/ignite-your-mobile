
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PlanFormPage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Plan Manager</h1>
        <p className="text-gray-600">Create and manage service plans with terms</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Plan management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanFormPage;
