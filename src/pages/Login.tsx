import { LoginForm } from "@/components/"
import { Role } from "@/@types"
interface LoginProps {
  role: Role
}

export default function Login({ role }: LoginProps) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm role={role} />
      </div>
    </div>
  )
}