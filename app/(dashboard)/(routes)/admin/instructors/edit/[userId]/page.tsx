"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { omit } from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
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
  getInstructorByIdService,
  getUserByIdService,
  updateInstructorService,
  updateUserService,
} from "@/services/user.service";
import Image from "next/image";
import { useEffect } from "react";

const EditUserPage = () => {
  const router = useRouter();
  const { userId } = useParams();

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
    profilePictureURL: z.string().optional(),
    bannerPictureURL: z.string().optional(),
    profilePictureURLTmp: z.string().optional(),
    bannerPictureURLTmp: z.string().optional(),
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
      major: "",
      yearOfStudy: 0,
      gpa: 0,
      graduationStatus: "",
      department: "",
      profilePictureURL: "",
      bannerPictureURL: "",
      profilePictureURLTmp: "",
      bannerPictureURLTmp: "",
    },
  });

  const { formState } = form;

  useEffect(() => {
    const fetchInfoInstructor = async () => {
      if (userId) {
        const response = await getInstructorByIdService(Number(userId as any));
        if (response) {
          const response2 = await getUserByIdService(response.data.userId);
          if (response2) {
            const userData = {
              ...response2.data,
              department: response.data.department,
              userId: response.data.userId,
              id: response.data.id,
              dateOfBirth: new Date(response2.data.dateOfBirth),
              role: UserRole.INSTRUCTOR,
            };
            form.reset(userData);
          }
        }
      }
    };
    fetchInfoInstructor();
  }, [form, userId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let body: any = {};
      await updateUserService(
        values.userId ?? 0,
        omit(values, [
          "userId",
          "major",
          "yearOfStudy",
          "gpa",
          "graduationStatus",
          "department",
          "profilePictureURLTmp",
          "bannerPictureURLTmp",
        ])
      );
      body.userId = values.userId ?? 0;
      body.department = values.department;

      const instructorResponse = await updateInstructorService(
        Number(userId),
        body
      );
      if (instructorResponse) {
        router.push(`/admin/instructors`);
        toast.success("Cập nhật giảng viên thành công");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Cập nhật giảng viên thất bại"
      );
    }
  };

  const uploadFile = async (file: File, fieldName: string) => {
    try {
      const response = await uploadFileService(file);
      if (response.data.fileUrl) {
        form.setValue(fieldName as any, response.data.fileUrl, {
          shouldValidate: formState.isDirty,
        });
        toast.success("File được tải lên thành công");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-2xl text-center">Sửa thông tin người dùng</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới tính</FormLabel>
                    <FormControl>
                      <Combobox
                        options={[
                          { value: UserGender.MALE, label: UserGender.MALE },
                          {
                            value: UserGender.FEMALE,
                            label: UserGender.FEMALE,
                          },
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
                    <FormLabel>Ngày sinh</FormLabel>
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
                    <FormLabel>Số điện thoại</FormLabel>
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
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. '123 Main St'" {...field} />
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
                    <FormLabel>Thành phố</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 'New York'" {...field} />
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
                    <FormLabel>Mã bưu điện</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. '10001'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                    <FormLabel>Ảnh nền</FormLabel>
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
            </div>
          </div>
          <div className="flex justify-end gap-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              onClick={() => {
                console.log("Form state:", formState);
                console.log("Form errors:", form.formState.errors);
              }}
            >
              {formState.isSubmitting ? "Đang lưu..." : "Lưu"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditUserPage;
