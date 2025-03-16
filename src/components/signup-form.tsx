import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, SubmitHandler } from "react-hook-form"
import { FormError } from "@/components"
import { useSignup } from "@/hooks" 
import { useNavigate } from "react-router"

interface SignupInputs {
  email: string;
  password: string;
  confirmedPassword: string;
}
export default function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { signup, isLoading, error } = useSignup()
  const navigate = useNavigate()

  const { register, 
          handleSubmit, 
          formState: { errors, isSubmitting }, 
          reset,
          getValues
  } = useForm<SignupInputs>();
  
  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    await signup(data.email, data.password)
    if (!error) {
      navigate('/admin')
    }
    reset()
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your email below to sign up a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email" type="email" placeholder="m@example.com" required 
                  {...register("email", {
                    minLength: 7,
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                      message: "Invalid email format"
                    }
                  })}
                />
                {errors.email && (<FormError message={`${errors.email.message}`}/>)}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required 
                {...register("password", {
                  minLength: 6,
                  maxLength: 20,
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter and one number"
                  }
                })} 
                />
                {errors.password && <FormError message={`${errors.password.message}`}/>}                
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                </div>
                <Input id="confirm-password" type="password" required 
                {
                  ...register("confirmedPassword", {
                    validate: (value) =>
                      value === getValues("password") || "Passwords must match",
                  })
                }
                />
                {errors.confirmedPassword && <FormError message={`${errors.confirmedPassword.message}`}/>}                
              </div>
              <Button 
                disabled={isSubmitting || isLoading}
                type="submit" 
                className="w-full">
                Sign Up
              </Button>
              <Button variant="outline" className="w-full">
                Sign Up with Google
              </Button>
              {error && <FormError message={error}/>} 
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/admin/login" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}