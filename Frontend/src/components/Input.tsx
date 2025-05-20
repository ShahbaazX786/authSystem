import type { InputPropType } from "../utils/types";

const Input = ({ icon: Icon, ...props }: InputPropType | unknown) => {
  return (
    <div className="relative mb-6k">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-green-500" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-gray-800/50 border rounded-lg border-gray-700 focus:border-gray-500 focus:ring-2 focus:ring-green-500 text-white placeholdergray400 transition-all ease-in-out duration-200"
      />
    </div>
  );
};

export default Input;
