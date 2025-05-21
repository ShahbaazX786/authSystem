import { Check, X } from "lucide-react";
import type { PasswordStrengthPropType } from "../utils/types";
import {
  getPasswordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthInWords,
} from "../utils/utilities";
import { AnimatePresence, motion } from "framer-motion";

const PasswordStrengthChecker = ({ password }: PasswordStrengthPropType) => {
  const strength = getPasswordStrength(password);
  return (
    <AnimatePresence>
      {password.length >= 1 && (
        <motion.div
          className="mt-2"
          initial={{ opacity: 0, y: 20 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Password Strength</span>
            <span className="text-xs text-gray-400">
              {getPasswordStrengthInWords(strength)}
            </span>
          </div>

          <div className="flex space-x-1">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`h-1 w-1/4  rounded-full transition-colors duration-300 ${
                  index < strength
                    ? getPasswordStrengthColor(strength)
                    : "bg-gray-600"
                }`}
              ></div>
            ))}
          </div>
          <PasswordCriteria password={password} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordStrengthChecker;

const PasswordCriteria = ({ password }: PasswordStrengthPropType) => {
  const StrenghCriteria = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains Uppercase characters", met: /[A-Z]/.test(password) },
    { label: "Contains Lowercase characters", met: /[a-z]/.test(password) },
    { label: "Contains a digit", met: /\d/.test(password) },
    {
      label: "Contains special characters",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div className="mt-2 space-y-1">
      {StrenghCriteria.map((item, index) => (
        <div key={index} className="flex items-center text-xs">
          {item.met ? (
            <Check className="size-4 text-green-500 mr-2" />
          ) : (
            <X className="size-4 text-gray-500 mr-2" />
          )}
          <span className={item.met ? "text-green-500" : "text-gray-500"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
