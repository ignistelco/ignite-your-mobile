
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const GigsTestPage = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const testGigsIntegration = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-api', {
        body: { action: 'test-gigs' }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Gigs integration test completed",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dev Console</h1>
        <p className="text-gray-600">Development tools and Gigs API testing</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gigs Integration Testing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Test connectivity and functionality with the Gigs API
          </p>
          <Button onClick={testGigsIntegration} disabled={loading}>
            {loading ? 'Testing...' : 'Test Gigs Integration'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GigsTestPage;
