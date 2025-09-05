'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { AuthHeaderSwitch } from '@/components/auth/AuthHeaderSwitch';
import { Tagline } from '@/components/branding/tagline';
import { StepNavigation } from '@/components/auth/StepNavigation';

export default function RegisterPage() {
  const form = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      pseudo: '',
      username: '',
    },
  });

  return (
    <section className="flex flex-col items-center justify-between h-dvh pb-6 md:pb-4">
      {/* header */}
      <AuthHeaderSwitch type="register" href="/auth/login" />
      {/* content */}
      <div
        className="flex flex-col justify-center items-center gap-1 
      w-full *:w-full md:*:w-2/3 lg:*:w-[42%]"
      >
        <StepNavigation step={1} />
        {/* Step Card */}
        <Card className="p-4 dark:bg-transparent lg:p-6">
          <CardTitle className="text-lg text-center">
            Crée ton identité
          </CardTitle>
          {/* Form Content */}
          <CardContent className="flex flex-col gap-10 p-1 md:flex-row">
            <Form {...form}>
              <form action="" className="flex flex-col flex-1 gap-4">
                <FormField
                  control={form.control}
                  name="pseudo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ton pseudo</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="py-6"
                          placeholder="VibeQueen"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identifiant unique</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="@vibequeen848"
                            type="text"
                            className="py-6"
                            {...field}
                          />
                          <span className="absolute -translate-y-1/2 right-4 top-1/2">
                            {/* <MotionButton
                            type="button"
                            className="*:!size-5 lg:*:!size-4"
                          ></MotionButton> */}
                          </span>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Ton identifiant sera visible par tous
                      </FormDescription>{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <Button
                  // onClick={handleClick}
                  size="lg"
                  className="relative overflow-hidden rounded-full cta"
                  type="submit"
                >
                  Continuer
                  {/* grain overlay */}
                  <span
                    className="absolute inset-0 opacity-20 pointer-events-none 
                         mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
                  ></span>
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* <Card>
          <CardTitle></CardTitle>
          <CardContent></CardContent>
        </Card>

        <Card>
          <CardTitle></CardTitle>
          <CardContent></CardContent>
        </Card> */}
      </div>
      {/* tag */}
      <Tagline />
    </section>
  );
}
