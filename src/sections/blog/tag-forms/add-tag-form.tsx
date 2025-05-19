import { useCallback, useState } from 'react';

import { Button } from '@mui/material';
import { Stack, TextField } from '@mui/material';

import { useAddTag } from 'src/hooks/useTags';

interface UserRegisterFormProps {
    agencies: string[];
}

export function AddTagForm() {
    const [formData, setFormData] = useState({
        name: '',
    });
    const [errors, setErrors] = useState({
        name: false,
    });


    const { mutate: addTag, isPending } = useAddTag();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => {return {
            ...prevData,
            [name]: value,
        }});
        setErrors((prev) => {return { ...prev, [name]: false }});
    };


    const validate = () => {
        const newErrors = {
            name: !formData.name,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    const handleSubmit = useCallback(() => {
    if (validate()) {
        addTag({
            name: formData.name,
        });

        setFormData({
            name: '',
        });
    }
    
      }, [formData, addTag]);

    return (
        <Stack spacing={3}>
            <TextField
                name="name"
                label="Tag Name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                helperText={errors.name ? 'Tag name is required' : ''}
            />

            <Button
                variant="contained"
                color="inherit"
                sx={{ width: '200px', alignSelf: 'center' }}
                onClick={handleSubmit}
                disabled={isPending}
            >
                {isPending ? 'Adding Tag...' : 'Add Tag'}
            </Button>
        </Stack>
    );
}
