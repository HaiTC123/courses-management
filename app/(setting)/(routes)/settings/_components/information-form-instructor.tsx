"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { omit } from "lodash";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { DEFAULT_IMAGE } from "@/constants/default-image";
import { UserGender } from "@/enum/user-gender";
import { UserRole } from "@/enum/user-role";
import { UserState } from "@/enum/user-state";
import { uploadFileService } from "@/services/file.service";
import {
  getPaginatedInstructorsService,
  IGetPaginatedUsersParams,
  updateStudentService,
  updateUserService,
} from "@/services/user.service";
import { useAuthStore } from "@/store/use-auth-store";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const InformationForm = () => {
  const router = useRouter();
  const { user } = useAuthStore.getState();

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
    profilePictureURL: z.string().optional(),
    profilePictureURLTmp: z.string().optional(),
    bannerPictureURL: z.string().optional(),
    bannerPictureURLTmp: z.string().optional(),
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
      role: UserRole.INSTRUCTOR,
      gender: UserGender.OTHER,
      dateOfBirth: new Date(),
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: UserState.ACTIVE,
      postalCode: "",
      profilePictureURL: "",
      profilePictureURLTmp: "",
      bannerPictureURL: "",
      bannerPictureURLTmp: "",
    },
  });

  const [general, setGeneral] = useState<any>(null);
  const [instructor, setInstructor] = useState<any>(null);
  const [userId, setUserId] = useState<number>(0);

  const [params, setParams] = useState<IGetPaginatedUsersParams>({
    pageSize: 1000,
    pageNumber: 1,
    conditions: [
      {
        key: "id",
        condition: "equal",
        value: user.instructor.id,
      },
    ],
    sortOrder: "",
    searchKey: "",
    searchFields: [],
    includeReferences: {
      user: true,
    },
  });

  const fetchInstructors = useCallback(() => {
    getPaginatedInstructorsService(params)
      .then((response) => {
        if (response.data.data) {
          const listInstructors: any[] = response.data.data;
          if (listInstructors.length > 0) {
            setGeneral(listInstructors[0].user);
            setInstructor(omit(listInstructors[0], ["user"]));
            setUserId(listInstructors[0].userId);
          }
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [params]);

  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

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
        profilePictureURL: general.profilePictureURL || "",
        profilePictureURLTmp: "",
        bannerPictureURL: general.bannerPictureURL || "",
        bannerPictureURLTmp: "",
      });
    }
  }, [instructor, general, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userResponse = await updateUserService(
        userId,
        omit(values, ["profilePictureURLTmp", "bannerPictureURLTmp"])
      );
      if (userResponse) {
        toast.success("Cập nhật thông tin thành công");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Cập nhật thông tin thất bại"
      );
    }
  };

  const onSubmitStudent = async (values: z.infer<typeof studentFormSchema>) => {
    try {
      const studentResponse = await updateStudentService(
        user.student.id,
        values
      );
      if (studentResponse) {
        toast.success("Cập nhật thông tin thành công");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Cập nhật thông tin thất bại"
      );
    }
  };

  const uploadFile = async (file: File, fieldName: string) => {
    try {
      const response = await uploadFileService(file);
      if (response.data.fileUrl) {
        form.setValue(fieldName as any, response.data.fileUrl);
        toast.success("File được tải lên thành công");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
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
                  name="profilePictureURLTmp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ảnh đại diện</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="file"
                          onChange={(event) => {
                            if (event.target.files?.[0]) {
                              uploadFile(
                                event.target.files?.[0],
                                "profilePictureURL"
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.getValues("profilePictureURL") && (
                  <div>
                    <Image
                      src={form.getValues("profilePictureURL") ?? DEFAULT_IMAGE}
                      alt="Profile Picture"
                      width={0}
                      height={0}
                      sizes="100px"
                      style={{ width: "100px", height: "auto" }}
                    />
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="bannerPictureURLTmp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ảnh bìa</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="file"
                          onChange={(event) => {
                            if (event.target.files?.[0]) {
                              uploadFile(
                                event.target.files?.[0],
                                "bannerPictureURL"
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.getValues("bannerPictureURL") && (
                  <div>
                    <Image
                      src={form.getValues("bannerPictureURL") ?? DEFAULT_IMAGE}
                      alt="Banner Picture"
                      width={0}
                      height={0}
                      sizes="100px"
                      style={{ width: "100px", height: "auto" }}
                    />
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giới tính</FormLabel>
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
    </div>
  );
};

export default InformationForm;
