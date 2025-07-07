
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const deviceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  is_active: z.boolean(),
  specs: z.object({}).optional(),
  gigs_device_model_id: z.string().optional(),
});

type DeviceFormData = z.infer<typeof deviceSchema>;

const DeviceFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(id && id !== 'new');

  const form = useForm<DeviceFormData>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      name: '',
      is_active: true,
      specs: {},
    },
  });

  useEffect(() => {
    if (isEditing) {
      loadDevice();
    }
  }, [id, isEditing]);

  const loadDevice = async () => {
    try {
      const { data, error } = await supabase
        .from('device_product_models')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      form.reset({
        name: data.name,
        is_active: data.is_active,
        specs: data.specs || {},
        gigs_device_model_id: data.gigs_device_model_id || '',
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: DeviceFormData) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        specs: data.specs || {},
      };

      let result;
      if (isEditing) {
        result = await supabase
          .from('device_product_models')
          .update(payload)
          .eq('id', id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('device_product_models')
          .insert(payload)
          .select()
          .single();
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: isEditing ? "Device updated successfully" : "Device created successfully",
      });

      if (!isEditing) {
        navigate(`/admin/devices/${result.data.id}`);
      }
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
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Edit Device' : 'Create New Device'}
        </h1>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="core" className="space-y-6">
          <TabsList>
            <TabsTrigger value="core">Core Info</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="specs">Specs</TabsTrigger>
            <TabsTrigger value="attributes">Attributes</TabsTrigger>
          </TabsList>

          <TabsContent value="core">
            <Card>
              <CardHeader>
                <CardTitle>Core Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Device Name</Label>
                  <Input
                    id="name"
                    {...form.register('name')}
                    placeholder="e.g. iPhone 15 Pro Max"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gigs_device_model_id">Gigs Device Model ID</Label>
                  <Input
                    id="gigs_device_model_id"
                    {...form.register('gigs_device_model_id')}
                    placeholder="Optional: Link to Gigs device model"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={form.watch('is_active')}
                    onCheckedChange={(checked) => form.setValue('is_active', checked)}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="variants">
            <Card>
              <CardHeader>
                <CardTitle>Device Variants</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Variant management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>Media Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Media upload coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specs">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Specs editor coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attributes">
            <Card>
              <CardHeader>
                <CardTitle>Attributes & Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Attribute management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/devices')}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (isEditing ? 'Update' : 'Create')} Device
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DeviceFormPage;
