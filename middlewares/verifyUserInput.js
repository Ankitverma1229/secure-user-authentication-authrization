import validator from 'validator';

export const validateData = (password, email)=>{
     // Validating email
  if (email && !validator.isEmail(email)) {
    throw new Error("Invalid email address");
  }

  // Validating password
  if (password && !validator.isLength(password, { min: 6 })) {
    throw new Error("Password must be at least 6 characters");
  }

  return true;
}