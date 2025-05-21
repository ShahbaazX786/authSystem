export const getPasswordStrengthInWords = (strength: number) => {
  switch (strength) {
    case 0:
      return "Bruh";
      break;
    case 1:
      return "Weak";
      break;
    case 2:
      return "Fair";
      break;
    case 3:
      return "Good";
      break;
    default:
      return "Very Strong";
      break;
  }
};

export const getPasswordStrength = (pass: string) => {
  let strength = 0;
  if (pass.length >= 8) strength++;
  if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
  if (pass.match(/\d/)) strength++;
  if (pass.match(/[^A-Za-z0-9]/)) strength++;
  return strength;
};

export const getPasswordStrengthColor = (strength: number) => {
  switch (strength) {
    case 0:
      return "bg-red-500";
      break;
    case 1:
      return "bg-red-400";
      break;
    case 2:
      return "bg-yellow-500";
      break;
    case 3:
      return "bg-yellow-400";
      break;
    default:
      return "bg-green-500";
      break;
  }
};
