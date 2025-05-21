export type FloatingShapePropType = {
  color: string;
  size: string;
  top: string;
  left: string;
  delay: number;
};

export type InputPropType = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & any;

export type ChangeEventType = React.ChangeEvent<HTMLInputElement>;
export type FormEventType = React.FormEvent<HTMLFormElement>;

export type PasswordStrengthPropType = {
  password: string;
};
