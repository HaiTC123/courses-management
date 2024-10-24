"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserGender } from "@/enum/user-gender";
import { UserState } from "@/enum/user-state";
import { UserRole } from "@/enum/user-role";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";

const CreatePage = () => {
  const router = useRouter();

  const formSchema = z.object({
    fullName: z.string().min(1, {
      message: "Full name is required",
    }),
    email: z.string().min(1, {
      message: "Email is required",
    }),
    role: z.nativeEnum(UserRole),
    gender: z.nativeEnum(UserGender),
    dateOfBirth: z.date(),
    phoneNumber: z.string().refine((value) => /^[0-9]{10}$/.test(value), {
      message: "Phone number must be 10 digits",
    }),
    addressLine1: z.string(),
    addressLine2: z.string().optional(),
    city: z.string(),
    state: z.nativeEnum(UserState),
    postalCode: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: UserRole.STUDENT,
      gender: UserGender.OTHER,
      dateOfBirth: new Date(),
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: UserState.ACTIVE,
      postalCode: "",
    },
  });

  // ... existing code ...

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // const response = await axios.post("/api/courses", values);
      // router.push(`/instructor/courses/${response.data.id}`);
      toast.success("Course created successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-xl p-6 mx-auto">
      <h1 className="text-2xl">Thêm người dùng</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 'John Doe'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 'john.doe@example.com'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Role</FormLabel>
                <FormControl>
                  <Combobox
                    options={[
                      { value: UserRole.STUDENT, label: UserRole.STUDENT },
                      {
                        value: UserRole.INSTRUCTOR,
                        label: UserRole.INSTRUCTOR,
                      },
                      { value: UserRole.ADMIN, label: UserRole.ADMIN },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Combobox
                    options={[
                      { value: UserGender.MALE, label: UserGender.MALE },
                      { value: UserGender.FEMALE, label: UserGender.FEMALE },
                      { value: UserGender.OTHER, label: UserGender.OTHER },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={
                      field.value ? field.value.toISOString().split("T")[0] : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. '09123456789'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. '123 Main St'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressLine2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 2</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 'Apt 4B'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 'New York'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Combobox
                    options={[
                      { value: UserState.ACTIVE, label: UserState.ACTIVE },
                      {
                        value: UserState.SUSPENDED,
                        label: UserState.SUSPENDED,
                      },
                      {
                        value: UserState.DEACTIVATED,
                        label: UserState.DEACTIVATED,
                      },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. '10001'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* ... existing buttons ... */}
          <div className="flex justify-end gap-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePage;
