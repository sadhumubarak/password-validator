export const validation = (value) => {
  console.log("value", value);
  const errors = {
    passwordLength: false,
    cases: false,
    repeatMode: false,
  };
  if (value?.length < 6 || value?.length > 20) {
    errors.passwordLength = true;
  } else {
    errors.passwordLength = false;
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/.test(value)) {
    errors.cases = true;
  } else {
    errors.cases = false;
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*(.)\1\1).{6,20}$/.test(value)) {
    errors.repeatMode = true;
  } else {
    errors.repeatMode = false;
  }
  return errors;
};
