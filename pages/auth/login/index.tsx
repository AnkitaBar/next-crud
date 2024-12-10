// pages/login.js
import React from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import { loginMutation } from '@/customHooks/auth.query.hooks';
import { loginProps } from '@/typeScript/auth.interface';
import { FieldValues, useForm } from 'react-hook-form';
import Link from 'next/link';

export default function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm<loginProps>()

  const { mutate, isPending } = loginMutation()

  // const router = useRouter()
  
  const onSubmit = async (formData: FieldValues) => {
    const { email, password } = formData as { email: string; password: string };
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    mutate(formData);
    // console.log(formData,"formdata");

    // router.push("/cms/list");
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Paper
          elevation={3}
          sx={{
            padding: '40px',
            borderRadius: '10px',
            border: '1px solid #ddd',
            width: '100%',
          }}
        >
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            Sign In
          </Typography>
          {/* <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
            Please sign in to continue
          </Typography> */}
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              // name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Invalid email format',
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              // name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="outlined"
              {...register('password', {
                required: 'Password is required',
                // pattern: {
                //   value: /^(?=.*\d)([A-Za-z\d]{8,})$/,
                //   message: 'Password must be at least 8 characters long and contain at least one letter and one number',
                // },
              })}
            />
            <Button
              type="submit"

              onClick={handleSubmit(onSubmit)}

              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, borderRadius: '20px' }}
            >
              {isPending ? 'Loading...' : 'Log In'}
            </Button>
      <Typography variant="body2" style={{ marginTop: '20px' }}>
            no account?
          </Typography>
          <Link href="/auth/register" style={{ color: '#1976d2' }}>Sign Up</Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
