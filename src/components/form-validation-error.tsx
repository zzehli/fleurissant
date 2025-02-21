interface ErrorMessageProps {
  message: string | undefined;
}

export function FormValidationError({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <p role ="alert" className="text-red-500 text-sm mt-1">
      {message}
    </p>
  );
};