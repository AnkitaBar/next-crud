'use client'
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Avatar, IconButton, Stack, Box } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { FieldValues, useForm } from 'react-hook-form';
import Link from 'next/link';
import { registerProps } from '@/typeScript/auth.interface';
import { registerMutation } from '@/customHooks/auth.query.hooks';

const Input = styled('input')({
  display: 'none',
});

const Register : React.FC = () => {
    const [img, setImg] = useState<File | null>(null);
    const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerProps>();

  const { mutate, isPending } = registerMutation()

  const onSubmit = (formData: registerProps) => {
    const formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("email", formData.email);
    formdata.append("mobile", formData.mobile);
    formdata.append("password", formData.password);
    // for image
    if (img) {
      formdata.append("photo", img);
    }

    mutate(formdata);

    console.log(formData);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} mb={3} mt={3}>
      <Grid 
        item 
        xs={12} 
        sm={6} 
        md={4} 
        style={{
          borderRadius: '10px',
          border:'2px solid #1976d2',
          padding: '20px',
          backgroundColor: '#fff',
          color: '#000',
        }}
      >
        <form>
          <Typography variant="h4" gutterBottom style={{ color: '#1976d2' }}>
            Registration
          </Typography>

          <TextField
            fullWidth
            label="Full Name"
            // name="first_name"
            margin="normal"
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 3, message: 'Name must be at least 3 characters' },
            })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
            InputLabelProps={{ style: { color:  '#000' } }}
            InputProps={{
              style: {
                color:  '#000',
                backgroundColor:  '#fff',
              },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            // name="email"
            type="email"
            margin="normal"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Invalid email format',
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            InputLabelProps={{ style: { color: '#000' } }}
            InputProps={{
              style: {
                color: '#000',
                backgroundColor: '#fff',
              },
            }}
          />
          <TextField
            fullWidth
            label="Mobile"
            // name="email"
            type="text"
            margin="normal"
            {...register('mobile', {
              required: 'Mobile is required',
              pattern: {
                value: /\d{9}$/,
                message: 'Invalid mobile format',
              },
            })}
            error={!!errors.mobile}
            helperText={errors.mobile ? errors.mobile.message : ''}
            InputLabelProps={{ style: { color: '#000' } }}
            InputProps={{
              style: {
                color: '#000',
                backgroundColor: '#fff',
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            // name="password"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
              style: {
                color: '#000',
                backgroundColor: '#fff',
              }
            }}
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'Password must be at least 8 characters long and contain at least one letter and one number',
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />

        <Stack direction="row" alignItems="center" spacing={2} sx={{ marginTop: 2 }}>
            <label htmlFor="profile-pic-upload">
            <input
                accept="image/*"
                id="upload-button"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => e.target.files && setImg(e.target.files[0])}
              />
              <label htmlFor="upload-button">
                <Button
                  variant="contained"
                  component="span"
                  color="primary"
                  sx={{
                    backgroundColor: "green",
                    "&:hover": {
                      backgroundColor: "red",
                      color: "blue",
                    },
                  }}
                >
                  Upload
                </Button>
              </label>
              {img ? (
                <Box mt={2}>
                  <img
                    style={{ height: "180px", width: "100%" }}
                    src={URL.createObjectURL(img)}
                    alt=""
                    className="upload-img"
                  />
                </Box>
              ) : (
                <Box mt={2}>
                  <p>Drop content here</p>
                </Box>
              )}
                {/* <Button variant="contained" component="span">
                  Upload Profile Pic
                </Button> */}
            </label>
        </Stack>

          <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '20px', backgroundColor: '#1976d2' }} onClick={handleSubmit(onSubmit)}>
            {isPending ? '...Creating Account' : 'Register'} 
           
          </Button>

          <Grid>
            <Typography variant="body2" style={{ marginTop: '20px' }}>
              Already have an account?
            </Typography>
            <Link href="/auth/login" style={{ color: '#1976d2' }}>Sign In</Link>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Register;
