
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FilterManagerPage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Filter Manager</h1>
        <p className="text-gray-600">Manage brands, OS types, network tags, and other filter attributes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Brands</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Brand management coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operating Systems</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">OS management coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lifestyles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Lifestyle tags coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Network tags coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FilterManagerPage;
