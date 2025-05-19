/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';

import { Button, SelectChangeEvent } from '@mui/material';
import { Stack, TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';

import { useRegister } from 'src/hooks/useUsers';

interface UserRegisterFormProps {
    agencies: string[];
}

export function UserRegisterForm({ agencies }: UserRegisterFormProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        agency: '',
    });
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        role: false,
        agency: false,
    });

    const { mutate: register, isPending } = useRegister();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => {return {
            ...prevData,
            [name]: value,
        }});
        setErrors((prev) => {return { ...prev, [name]: false }});
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setFormData((prevData) => {return {
            ...prevData,
            [name]: value,
        }});
        setErrors((prev) => {return { ...prev, [name]: false }});
    };

    const roles = ['MANAGER', 'ADMIN'];

    const validate = () => {
        const newErrors = {
            firstName: !formData.firstName,
            lastName: !formData.lastName,
            email: !formData.email,
            role: !formData.role,
            agency: !formData.agency,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    const handleSubmit = useCallback(() => {
    if (validate()) {
        register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            role: formData.role,
            agency: formData.agency,
        });

        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            agency: '',
        });
    }
    
      }, [formData, register]);

    return (
        <Stack spacing={3}>
            <TextField
                name="firstName"
                label="First Name"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                helperText={errors.firstName ? 'First name is required' : ''}
            />
            <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                helperText={errors.lastName ? 'Last name is required' : ''}
            />
            <TextField
                name="email"
                label="Email"
                fullWidth
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                helperText={errors.email ? 'Email is required' : ''}
            />
            <FormControl fullWidth error={errors.role}>
                <InputLabel>Role</InputLabel>
                <Select name="role" value={formData.role} label="Role" onChange={handleSelectChange}>
                    {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </Select>
                {errors.role && <FormHelperText>Role is required</FormHelperText>}
            </FormControl>
            <FormControl fullWidth error={errors.agency}>
                <InputLabel>Agency</InputLabel>
                <Select name="agency" value={formData.agency} label="Agency" onChange={handleSelectChange}>
                    {agencies.map((agency) => (
                        <MenuItem key={agency} value={agency}>
                            {agency}
                        </MenuItem>
                    ))}
                </Select>
                {errors.agency && <FormHelperText>Agency is required</FormHelperText>}
            </FormControl>

            <Button
                variant="contained"
                color="inherit"
                sx={{ width: '200px', alignSelf: 'center' }}
                onClick={handleSubmit}
                disabled={isPending}
            >
                {isPending ? 'Registering...' : 'Register'}
            </Button>
        </Stack>
    );
}
