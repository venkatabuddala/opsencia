import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const SignInLayer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validate credentials
    const validEmail = 'prashanthkumar@opsencia.com';
    const validPassword = 'QcZm7j2ENO8W';

    if (formData.email === validEmail && formData.password === validPassword) {
      // Valid credentials
      toast.success('Login successful! Welcome back.');
      console.log('Sign in successful:', formData);
      navigate('/itsm');
    } else {
      // Invalid credentials
      setError('Invalid email or password. Please check your credentials and try again.');
      toast.error('Invalid credentials. Please try again.');
    }

    setIsLoading(false);
  };
  return (
    <section className='auth bg-base d-flex flex-wrap'>
      <div className='auth-left d-lg-block d-none'>
        <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
          <img src='/assets/images/auth/ITSM.jpeg' alt='ITSM - Information Technology Service Management' />
        </div>
      </div>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <div>
            <Link to='/' className='mb-40 max-w-290-px'>
              <img src='/assets/images/main-logo.png' alt='Opsencia' />
            </Link>
            <h4 className='mb-12'>Sign In to your Account</h4>
            <p className='mb-32 text-secondary-light text-lg'>
              Welcome back! please enter your detail
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className='alert alert-danger mb-20 d-flex align-items-center gap-2' role='alert'>
                <Icon icon='ri-error-warning-line' className='text-danger-main' />
                <span className='text-sm'>{error}</span>
              </div>
            )}
            
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mage:email' />
              </span>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='Email'
                required
              />
            </div>
            <div className='position-relative mb-20'>
              <div className='icon-field'>
                <span className='icon top-50 translate-middle-y'>
                  <Icon icon='solar:lock-password-outline' />
                </span>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  className='form-control h-56-px bg-neutral-50 radius-12'
                  id='your-password'
                  placeholder='Password'
                  required
                />
              </div>
              <span
                className='toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light'
                data-toggle='#your-password'
              />
            </div>
            <div className=''>
              <div className='d-flex justify-content-between gap-2'>
                <div className='form-check style-check d-flex align-items-center'>
                  <input
                    className='form-check-input border border-neutral-300'
                    type='checkbox'
                    name='rememberMe'
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    id='remember'
                  />
                  <label className='form-check-label' htmlFor='remember'>
                    Remember me{" "}
                  </label>
                </div>
                <Link to='#' className='text-primary-600 fw-medium'>
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>


            <div className='mt-32 text-center text-sm'>
              <p className='mb-0'>
                Don’t have an account?{" "}
                <Link to='/sign-up' className='text-primary-600 fw-semibold'>
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
