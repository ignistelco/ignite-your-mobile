import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  GridLegacy as Grid,
  TextField,
  Switch,
  FormControlLabel,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add, Publish, Edit, Visibility } from '@mui/icons-material';
import { useDeviceModels } from '@/hooks/useDeviceModels';

const categories = [
  'Gaming & Streaming',
  'Entrepreneur PowerUser',
  'Photography & Film',
  'Rugged & Outdoor',
  'Privacy & Security',
  'Travel & Excursion',
  'Essential & Affordable',
  'Crypto'
];

export default function DevicePublisher() {
  const { data: devices, isLoading } = useDeviceModels();
  const [isPublishing, setIsPublishing] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  if (isLoading) return <Typography>Loading devices...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Device Publishing Center
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsPublishing(true)}
        >
          Publish New Device
        </Button>
      </Box>

      {isPublishing ? (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Publish Device to Store
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Device Name"
                  variant="outlined"
                  placeholder="e.g., iPhone 15 Pro"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Brand"
                  variant="outlined"
                  placeholder="e.g., Apple"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select label="Category">
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Base Price ($)"
                  variant="outlined"
                  type="number"
                  placeholder="999.00"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  variant="outlined"
                  placeholder="https://example.com/device-image.jpg"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Device Specifications (JSON)"
                  variant="outlined"
                  placeholder='{"storage_gb": 256, "color": "Black", "camera_mp": 48}'
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Publish to store immediately"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="contained" startIcon={<Publish />}>
                    Publish Device
                  </Button>
                  <Button variant="outlined" onClick={() => setIsPublishing(false)}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current Device Catalog
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Device Name</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devices?.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell>{device.name}</TableCell>
                    <TableCell>{(device.specs as Record<string, any> | null)?.brand || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip
                        label={device.is_active ? 'Published' : 'Draft'}
                        color={device.is_active ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{new Date(device.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button size="small" startIcon={<Edit />}>
                        Edit
                      </Button>
                      <Button size="small" startIcon={<Visibility />}>
                        Preview
                      </Button>
                    </TableCell>
                  </TableRow>
                )) || []}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}