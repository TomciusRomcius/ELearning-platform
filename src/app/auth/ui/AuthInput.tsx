import { forwardRef } from "react";

const AuthInput = forwardRef((
  props: React.InputHTMLAttributes<HTMLInputElement>,
  forwardedRef: React.ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className={`border-border border-1 rounded-lg ${props.className}`}>
      <input id={props.id} ref={forwardedRef} className="w-full p-2" />
    </div>
  );
});

export default AuthInput;
