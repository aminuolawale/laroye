import React from "react";

type FormErrorProps = {
  errors: string[];
};

const FormGroupErrors: React.FC<FormErrorProps> = ({
  errors,
}: FormErrorProps) => {
  return (
    <>
      {errors.map((error) => (
        <p>{error}</p>
      ))}
    </>
  );
};
export default FormGroupErrors;
