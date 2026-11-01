import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "../components/ui/card"
import { Input } from "../components/ui/input";
import { useState } from "react";
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useTypedDispatch } from '../../store';
import { authSlice } from "../../modules/auth/auth.slice";
import { toast } from "react-toastify";
import { LockOpen, Lock, Loader2 } from "lucide-react";
import { useAuthLoginMutation } from "../../modules/auth/auth.api";


const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

type LoginFormInputs = z.infer<typeof loginSchema>; 

  const LoginPage: React.FC = () => {
    const [authLogin, loginProcess] = useAuthLoginMutation();
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const form = useForm<LoginFormInputs>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        username: "",
        password: "",
      },
    });

    const dispatch = useTypedDispatch();
    const navigate = useNavigate();     

    const onSubmit = async (formValue: LoginFormInputs) => {
    const { username, password } = formValue;
      try {
        
        const response = await authLogin({
          username: username,
          password: password,
        }).unwrap();

        const accessToken = response?.data.accessToken;
        const currentUser = response?.data.user;
        console.log("response data",response.data);
        console.log("accesstoken",accessToken);
        console.log("currentUser",currentUser);
        dispatch(authSlice.actions.updateAccessToken(accessToken));
        dispatch(authSlice.actions.updateCurrentUser(currentUser));

        navigate('/');
      } catch (error: any) {
          if (error.status === 401) {
            toast.error('name atau password salah.');
          }      
          if (error.status === 404) {
            toast.error('user tidak ditemukan.');
          }
        console.log(error);
      }
    };



    return(
      <div className="flex items-center justify-center min-h-screen bg-amber-950">
          <Card className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField 
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="white">name</FormLabel>
                          <FormControl>
                            <Input placeholder="m@example.com" {...field} />
                          </FormControl>
                        </FormItem>
                      )}/>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="white">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={isPasswordVisible ? 'text' : 'password'}
                              placeholder="your password"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                              onClick={() => setPasswordVisible(!isPasswordVisible)}
                            >
                              {isPasswordVisible ? (
                                  <LockOpen className="h-5 w-5"/>
                                ) : (
                                  <Lock className="h-5 w-5" />
                                )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full py-2"
                    disabled={loginProcess.isLoading}
                  >
                    {loginProcess.isLoading ? (
                      <span className="flex flex-row items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </span>
                    ) : (
                      <span>Sign in</span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>          
        </div>
    )
  }
export default LoginPage;
