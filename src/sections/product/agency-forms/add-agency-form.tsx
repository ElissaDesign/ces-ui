import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { useAddAgency } from 'src/hooks/useAgency';

interface AgencyRegisterFormProps {
  tags: string[];
}

export function AddAgencyForm({ tags }: AgencyRegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: [] as string[],
  });

  const { mutate: addAgency, isPending } = useAddAgency();

  // Validation function
  const validate = () => (
      formData.name.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.tags.length > 0
    );

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (validate()) {
        addAgency({
          name: formData.name,
          description: formData.description,
          tags: formData.tags,
        });

        setFormData({
          name: '',
          description: '',
          tags: [],
        });
      }
    },
    [formData, addAgency]
  );

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Agency Name"
        margin="normal"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextField
        fullWidth
        label="Description"
        margin="normal"
        name="description"
        multiline
        rows={4}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <Autocomplete
        multiple
        options={tags}
        value={formData.tags}
        onChange={(_, value) => setFormData({ ...formData, tags: value })}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tags"
            margin="normal"
            required
            error={formData.tags.length === 0}
            helperText={formData.tags.length === 0 ? 'Select at least one tag' : ''}
          />
        )}
        sx={{ mt: 2 }}
      />
      <Button
        variant="contained"
        color="inherit"
        sx={{ width: '200px', alignSelf: 'center' }}
        onClick={handleSubmit}
        disabled={isPending}
      >
        Add Agency
      </Button>
    </Box>
  );
}