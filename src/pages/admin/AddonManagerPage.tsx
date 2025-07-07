
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AddonManagerPage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Addon Manager</h1>
        <p className="text-gray-600">Manage service add-ons and extras</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Add-ons</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Addon management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddonManagerPage;
