import { FC, ReactElement } from "react";

interface InputWrapperProps {
  label: string;
  description?: string;
  htmlFor?: string;
  children: ReactElement;
}

const InputWrapper: FC<InputWrapperProps> = ({
  htmlFor,
  children,
  label,
  description,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={htmlFor}
        className="flex select-none items-start gap-1 font-semibold text-gh-text"
      >
        {label}{" "}
        {children.props.required && (
          <span className="text-gh-red-active">*</span>
        )}
      </label>

      {children}

      {description !== undefined && (
        <div className="text-sm text-gh-text-secondary">{description}</div>
      )}
    </div>
  );
};

export default InputWrapper;
