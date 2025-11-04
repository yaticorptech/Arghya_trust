export const validatesankalpalogin = (phone) => {

  const errors = {};
  // Phone number validation (10-digit number)
  if (!/^\d{10}$/.test(phone)) {
    errors.phone = "Phone number is not 10 digits";
  }

  return errors;
};

export const validateAdminLogin = ({ cardNumber, password }) => {
  const errors = {};

  // Card Number Validation
  if (!cardNumber || cardNumber.trim() === "") {
    errors.cardNumber = "Card number is required.";
  } else if (!/^\d{12}$/.test(cardNumber)) {
    errors.cardNumber = "Card number must be 12 digits.";
  }

  // Password Validation
  if (!password || password.trim() === "") {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  return errors;
};
