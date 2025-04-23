import { SignupForm } from "@/components"
import { Role } from "@/@types"

interface SignupProps {
  role: Role
}
export default function Signup({ role }: SignupProps) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm role={role} />
      </div>
    </div>
  )
}