import { DatePicker } from "@/components/date-picker";
import { MultiSelect } from "@/components/multi-select";
import { TimePicker } from "@/components/time-picker/time-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postScheduledService } from "@/services/scheduled.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlarmCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  relatedId: z.string(),
  typeJob: z.string(),
  endTime: z.date(),
  jobDetail: z.string(),
  specificTime: z.date(),
  dayOfWeek: z.array(z.string()),
  onceDate: z.date(),
});

export const ScheduleCourse = ({ courseId }: { courseId: number }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      relatedId: "",
      typeJob: "daily",
      endTime: new Date(),
      jobDetail: "",
      specificTime: new Date(),
      dayOfWeek: [],
      onceDate: new Date(),
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const jobDetail = {
        specificTime: `${data.specificTime.getHours()}:${data.specificTime.getMinutes()}:${data.specificTime.getSeconds()}`,
        onceDate: data.onceDate,
        dayOfWeek: data.dayOfWeek.join(","),
      };
      const body = {
        endTime: data.endTime,
        typeJob: data.typeJob,
        relatedId: courseId,
        jobDetail: JSON.stringify(jobDetail),
      };
      const response = await postScheduledService(body);
      console.log(response);
      if (response) {
        toast.success("Lập lịch học thành công");
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lập lịch học thất bại");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <AlarmCheck />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>Lập lịch học</DialogTitle>
            <DialogDescription>
              Lập lịch học cho khóa học này.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày kết thúc</FormLabel>
                  <FormControl>
                    <DatePicker
                      date={new Date(field.value)}
                      setDate={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              disabled={isSubmitting}
            />

            <FormField
              control={form.control}
              name="typeJob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại lịch học</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Lựa chọn loại lịch học" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        { value: "weekly", label: "Weekly" },
                        { value: "daily", label: "Daily" },
                        { value: "once", label: "Once" },
                      ].map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
              disabled={isSubmitting}
            />

            <FormField
              control={form.control}
              name="specificTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thời gian học</FormLabel>
                  <FormControl>
                    <TimePicker
                      date={field.value}
                      setDate={(date) => {
                        field.onChange(date);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              disabled={isSubmitting}
            />

            {form.watch("typeJob") === "weekly" && (
              <FormField
                control={form.control}
                name="dayOfWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày học</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={[
                          { value: "1", label: "Thứ 2" },
                          { value: "2", label: "Thứ 3" },
                          { value: "3", label: "Thứ 4" },
                          { value: "4", label: "Thứ 5" },
                          { value: "5", label: "Thứ 6" },
                          { value: "6", label: "Thứ 7" },
                          { value: "7", label: "Chủ nhật" },
                        ]}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Chọn ngày học"
                        variant="inverted"
                        animation={2}
                        maxCount={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                disabled={isSubmitting}
              />
            )}

            {form.watch("typeJob") === "once" && (
              <FormField
                control={form.control}
                name="onceDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày học</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={new Date(field.value)}
                        setDate={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                disabled={isSubmitting}
              />
            )}

            <DialogFooter>
              <Button type="submit" disabled={!isValid}>
                Lưu lịch học
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
