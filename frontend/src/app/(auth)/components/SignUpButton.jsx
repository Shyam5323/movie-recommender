"use client";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useFormStatus, useFormState } from "react-dom";

export function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      className="btn btn-active btn-neutral"
      type="submit"
    >
      {pending ? `Submitting ${(<LoadingSkeleton />)}` : "Sign up"}
    </button>
  );
}
