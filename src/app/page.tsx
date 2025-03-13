'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from '@/assets/image/Logo.svg';
import Image from 'next/image';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { isAuthenticated, isInitialized, login: authenticate } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.replace('/membership');
    }
  }, [isAuthenticated, isInitialized, router]);

  const handleTogglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (): void => {
    if (login === 'admin' && password === '123') {
      const fakeToken = 'token';
      authenticate(fakeToken);
    } else {
      setErrorMessage('Invalid login or password');
    }
  };

  if (!isInitialized) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: "url('/background.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(39, 58, 138, 0.68)',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          width: 400,
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Image src={logo} alt="Logo" width={100} height={100} />
        </Box>

        <Typography variant="subtitle1" textAlign="center" mb={3}>
          Hello, it's Nazar
        </Typography>
        {errorMessage && (
          <Typography color="error" mb={2}>
            {errorMessage}
          </Typography>
        )}
        <TextField
          label="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          fullWidth
          margin="normal"
          required
          variant="outlined"
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Log In
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
