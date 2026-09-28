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
} from '@mui/material';
import { Add, Edit, Delete, Publish } from '@mui/icons-material';

const mockContent = [
  { id: 1, title: 'Homepage Hero Section', type: 'Banner', status: 'Published', lastModified: '2024-01-15' },
  { id: 2, title: 'Device Categories', type: 'Content Block', status: 'Draft', lastModified: '2024-01-14' },
  { id: 3, title: 'Privacy Policy', type: 'Legal', status: 'Published', lastModified: '2024-01-13' },
];

export default function CMSContentManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          CMS Content Manager
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsEditing(true)}
        >
          Create Content
        </Button>
      </Box>

      {isEditing ? (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {selectedContent ? 'Edit Content' : 'Create New Content'}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Content Title"
                  variant="outlined"
                  defaultValue={selectedContent?.title || ''}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Content Type"
                  variant="outlined"
                  defaultValue={selectedContent?.type || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Content Body"
                  variant="outlined"
                  placeholder="Enter your content here..."
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Publish immediately"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="contained" startIcon={<Publish />}>
                    Save & Publish
                  </Button>
                  <Button variant="outlined" onClick={() => setIsEditing(false)}>
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
            Content Library
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Modified</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockContent.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell>{content.title}</TableCell>
                    <TableCell>{content.type}</TableCell>
                    <TableCell>
                      <Chip
                        label={content.status}
                        color={content.status === 'Published' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{content.lastModified}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => {
                          setSelectedContent(content);
                          setIsEditing(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button size="small" startIcon={<Delete />} color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}