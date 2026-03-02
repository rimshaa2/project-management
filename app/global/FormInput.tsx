import * as S from "../projects/ProjectModal.styles";
import * as T from "../tasks/TaskModal.styles";
import { Control, Controller, RegisterOptions } from "react-hook-form";

type FormInputProps = {
  name: string;
  label: string;
  control: Control<any>;
  error?: string;
  required?: boolean;
  rules?: RegisterOptions;
  type?: string;
  placeholder?: string;
};

const FormInput = ({
  name,
  control,
  label,
  error,
  rules,
  required,
  ...props
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <S.FormGroup>
          {required ? (
            <T.RequiredLabel>{label}</T.RequiredLabel>
          ) : (
            <label>{label}</label>
          )}

          <input {...field} {...props} value={field.value || ""} />
          {error && (
            <span style={{ color: "#ff4d4d", fontSize: "12px" }}>
              {error.message}
            </span>
          )}
        </S.FormGroup>
      )}
    />
  );
};

export default FormInput;
