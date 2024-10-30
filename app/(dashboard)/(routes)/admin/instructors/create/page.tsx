"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { omit } from "lodash";

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
import { DatePicker } from "../_components/date-picker";
import {
  createInstructorService,
  createStudentService,
  createUserService,
} from "@/services/user.service";

const CreateUserPage = () => {
  const router = useRouter();

  const formSchema = z.object({
    userId: z.number().optional(),
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
    major: z.string().optional(),
    yearOfStudy: z.number().optional(),
    gpa: z.number().min(0).max(4).optional(),
    graduationStatus: z.string().optional(),
    department: z.string().optional(),
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
      major: "",
      yearOfStudy: 0,
      gpa: 0,
      graduationStatus: "",
      department: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let body: any = {};
      const response = await createUserService(
        omit(values, [
          "userId",
          "major",
          "yearOfStudy",
          "gpa",
          "graduationStatus",
          "department",
        ])
      );
      const userId = response.data;
      if (values.role === UserRole.STUDENT) {
        body.userId = userId;
        body.major = values.major;
        body.yearOfStudy = values.yearOfStudy;
        body.gpa = values.gpa;
        body.graduationStatus = values.graduationStatus;

        const studentResponse = await createStudentService(body);
        if (studentResponse) {
          router.push(`/admin/users`);
          toast.success("User created successfully");
        }
      }
      if (values.role === UserRole.INSTRUCTOR) {
        body.userId = userId;
        body.department = values.department;

        const instructorResponse = await createInstructorService(body);
        if (instructorResponse) {
          router.push(`/admin/users`);
          toast.success("User created successfully");
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
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
                  <DatePicker date={field.value} setDate={field.onChange} />
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
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("role") === UserRole.STUDENT && (
            <>
              <FormField
                control={form.control}
                name="major"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Major</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 'Computer Science'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearOfStudy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year of Study</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. '3'"
                        {...field}
                        type="number"
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GPA</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. '3.5'"
                        {...field}
                        type="number"
                        step="0.01"
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="graduationStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graduation Status</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 'Graduated'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {form.watch("role") === UserRole.INSTRUCTOR && (
            <>
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 'Computer Science'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex justify-end gap-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Hủy
            </Button>
            <Button type="submit">Tạo</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateUserPage;
