"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { omit } from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserGender } from "@/enum/user-gender";
import { UserRole } from "@/enum/user-role";
import { UserState } from "@/enum/user-state";
import {
  getPaginatedStudentsService,
  IGetPaginatedUsersParams,
  updateStudentService,
  updateUserService,
} from "@/services/user.service";
import { useCallback, useEffect, useState } from "react";
import { DatePicker } from "../../../../../../../components/date-picker";

const EditUserPage = () => {
  const router = useRouter();
  const { userId: id } = useParams();

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
  });

  const studentFormSchema = z.object({
    major: z.string().optional(),
    yearOfStudy: z.number().optional(),
    gpa: z.number().min(0).max(4).optional(),
    graduationStatus: z.string().optional(),
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

  const studentForm = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      major: "",
      yearOfStudy: 0,
      gpa: 0,
      graduationStatus: "",
    },
  });

  const [general, setGeneral] = useState<any>(null);
  const [student, setStudent] = useState<any>(null);
  const [userId, setUserId] = useState<number>(0);

  const [params, setParams] = useState<IGetPaginatedUsersParams>({
    pageSize: 10,
    pageNumber: 1,
    conditions: [
      {
        key: "id",
        condition: "equal",
        value: Number(id),
      },
    ],
    sortOrder: "",
    searchKey: "",
    searchFields: [],
    includeReferences: {
      user: true,
    },
  });

  const fetchStudents = useCallback(() => {
    getPaginatedStudentsService(params)
      .then((response) => {
        if (response.data.data) {
          const listStudents: any[] = response.data.data;
          if (listStudents.length > 0) {
            setGeneral(listStudents[0].user);
            setStudent(omit(listStudents[0], ["user"]));
            setUserId(listStudents[0].userId);
          }
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [params]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    if (general) {
      form.reset({
        fullName: general.fullName || "",
        email: general.email || "",
        role: general.role || UserRole.STUDENT,
        gender: general.gender || UserGender.OTHER,
        dateOfBirth: general.dateOfBirth
          ? new Date(general.dateOfBirth)
          : new Date(),
        phoneNumber: general.phoneNumber || "",
        addressLine1: general.addressLine1 || "",
        addressLine2: general.addressLine2 || "",
        city: general.city || "",
        state: general.state || UserState.ACTIVE,
        postalCode: general.postalCode || "",
      });
    }

    if (student) {
      studentForm.reset({
        major: student.major || "",
        yearOfStudy: student.yearOfStudy || 0,
        gpa: student.gpa || 0,
        graduationStatus: student.graduationStatus || "",
      });
    }
  }, [student, general, form, studentForm]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userResponse = await updateUserService(userId, values);
      if (userResponse) {
        toast.success("Student updated successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const onSubmitStudent = async (values: z.infer<typeof studentFormSchema>) => {
    try {
      const studentResponse = await updateStudentService(Number(id), values);
      if (studentResponse) {
        toast.success("Student updated successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-2xl">Chỉnh sửa thông tin học viên</h1>

      <Tabs defaultValue="general" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">Thông tin chung</TabsTrigger>
          <TabsTrigger value="student">Thông tin học viên</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin chung</CardTitle>
                  <CardDescription>
                    Chỉnh sửa thông tin chung của học viên
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                            <Input
                              placeholder="e.g. 'john.doe@example.com'"
                              {...field}
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
                                {
                                  value: UserGender.MALE,
                                  label: UserGender.MALE,
                                },
                                {
                                  value: UserGender.FEMALE,
                                  label: UserGender.FEMALE,
                                },
                                {
                                  value: UserGender.OTHER,
                                  label: UserGender.OTHER,
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
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <DatePicker
                              date={field.value}
                              setDate={field.onChange}
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
                            <Input
                              placeholder="e.g. '09123456789'"
                              {...field}
                            />
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
                            <Input
                              placeholder="e.g. '123 Main St'"
                              {...field}
                            />
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
                                {
                                  value: UserState.ACTIVE,
                                  label: UserState.ACTIVE,
                                },
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
                                {
                                  value: UserRole.STUDENT,
                                  label: UserRole.STUDENT,
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
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-end gap-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                    >
                      Hủy
                    </Button>
                    <Button type="submit">Lưu</Button>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="student">
          <Form {...studentForm}>
            <form
              onSubmit={studentForm.handleSubmit(onSubmitStudent)}
              className="mt-8 space-y-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin học viên</CardTitle>
                  <CardDescription>
                    Chỉnh sửa thông tin của học viên
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <>
                      <FormField
                        control={studentForm.control}
                        name="major"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Major</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. 'Computer Science'"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={studentForm.control}
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
                        control={studentForm.control}
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
                        control={studentForm.control}
                        name="graduationStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Graduation Status</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. 'Graduated'"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-end gap-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                    >
                      Hủy
                    </Button>
                    <Button type="submit">Lưu</Button>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditUserPage;
