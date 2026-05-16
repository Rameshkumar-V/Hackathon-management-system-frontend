import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Trophy, ChevronRight, ChevronLeft, Plus, Trash2, ShieldCheck, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';

const memberSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Must be a valid email'),
  phone: z.string().min(10, 'Must be at least 10 digits'),
  department: z.string().min(1, 'Department is required'),
  year: z.string().min(1, 'Year is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  isLeader: z.boolean().default(false),
});

const formSchema = z.object({
  teamName: z.string().min(1, 'Team name is required'),
  collegeName: z.string().min(1, 'College name is required'),
  projectDomain: z.string().min(1, 'Project domain is required'),
  members: z.array(memberSchema)
    .min(1, 'At least 1 member is required')
    .max(3, 'Maximum 3 members allowed')
    .refine((members) => members.filter(m => m.isLeader).length === 1, {
      message: 'Exactly one member must be selected as the team leader',
      path: ['root'], // Attaches error to the members array root
    }),
});

export default function RegisterTeam() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: '',
      collegeName: '',
      projectDomain: '',
      members: [
        {
          fullName: '',
          email: '',
          phone: '',
          department: '',
          year: '',
          password: '',
          isLeader: true, // First member is leader by default
        }
      ],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'members',
  });

  const handleNext = async () => {
    // Only validate step 1 fields before proceeding
    const isValid = await form.trigger(['teamName', 'collegeName', 'projectDomain']);
    if (isValid) {
      setStep(2);
    }
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const setLeader = (index) => {
    const currentMembers = form.getValues('members');
    currentMembers.forEach((_, i) => {
      form.setValue(`members.${i}.isLeader`, i === index, { shouldValidate: true });
    });
  };

  const onSubmit = (values) => {
    setIsLoading(true);
    console.log('Final Form JSON:', JSON.stringify(values, null, 2));
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen py-12 flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="fixed top-0 -left-4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="fixed top-0 -right-4 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="fixed -bottom-8 left-1/2 w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000 transform -translate-x-1/2"></div>

      <div className="relative z-10 w-full max-w-4xl px-4 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex bg-primary/10 p-3 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Register Your Team</h1>
          <p className="text-muted-foreground">Join the hackathon by setting up your team profile.</p>
        </div>

        <Card className="w-full bg-white/80 dark:bg-card/80 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader className="border-b border-border/50 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  {step === 1 ? 'Step 1: Team Details' : 'Step 2: Team Members'}
                </CardTitle>
                <CardDescription>
                  {step === 1 
                    ? 'Provide the basic information about your team.' 
                    : 'Add up to 3 members and select a team leader.'}
                </CardDescription>
              </div>
              <div className="flex gap-2 text-sm font-medium">
                <span className={`px-3 py-1 rounded-full ${step === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>1</span>
                <span className={`px-3 py-1 rounded-full ${step === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>2</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* STEP 1 */}
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="teamName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team Name</FormLabel>
                            <FormControl>
                              <Input placeholder="E.g. Byte Builders" {...field} className="bg-background/50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="collegeName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>College Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your college" {...field} className="bg-background/50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="projectDomain"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Project Domain</FormLabel>
                            <FormControl>
                              <Input placeholder="E.g. Artificial Intelligence, Web3, FinTech" {...field} className="bg-background/50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-in-up">
                    {form.formState.errors.members?.root && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md text-sm font-medium">
                        {form.formState.errors.members.root.message}
                      </div>
                    )}
                    
                    <div className="space-y-6">
                      {fields.map((member, index) => (
                        <div key={member.id} className="relative p-6 rounded-xl border border-border bg-card/50 transition-all hover:shadow-md">
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/50">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-lg">Member {index + 1}</h3>
                              {form.watch(`members.${index}.isLeader`) && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                  Team Leader
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {!form.watch(`members.${index}.isLeader`) && (
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setLeader(index)}
                                  className="h-8"
                                >
                                  Set as Leader
                                </Button>
                              )}
                              {fields.length > 1 && (
                                <Button 
                                  type="button" 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => remove(index)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                              control={form.control}
                              name={`members.${index}.fullName`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" {...field} className="bg-background/50" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`members.${index}.email`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="john@example.com" {...field} className="bg-background/50" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`members.${index}.phone`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone</FormLabel>
                                  <FormControl>
                                    <Input placeholder="+1 234 567 8900" {...field} className="bg-background/50" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`members.${index}.department`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Department</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Computer Science" {...field} className="bg-background/50" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`members.${index}.year`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Year</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g. 3rd Year" {...field} className="bg-background/50" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`members.${index}.password`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" placeholder="Create a password" {...field} className="bg-background/50" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {fields.length < 3 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-dashed border-2 py-6 text-muted-foreground hover:text-foreground"
                        onClick={() => append({
                          fullName: '', email: '', phone: '', department: '', year: '', password: '', isLeader: false
                        })}
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Member ({fields.length}/3)
                      </Button>
                    )}
                  </div>
                )}
                
                {/* Submit button needs to be inside the form, handled via footer */}
                <div id="form-actions-portal" className="hidden" />
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t border-border/50 pt-6">
            <div>
              {step === 2 && (
                <Button type="button" variant="ghost" onClick={handlePrevious}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
            </div>
            <div>
              {step === 1 ? (
                <Button type="button" onClick={handleNext}>
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  type="button" 
                  className="w-40 relative overflow-hidden"
                  disabled={isLoading}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    'Submit Registration'
                  )}
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already registered?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
