"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { ChaptersList } from "./chapters-list";

export interface Chapter {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  isPublished: boolean;
  isFree: boolean;
}

interface ChapterFormProps {
  initialData: {
    title: string;
    chapters: Chapter[];
  };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

export const ChapterForm = ({ initialData, courseId }: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created");
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      toast.success("Chapters reordered");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
    setIsCreating(false);
    setIsUpdating(false);
  };

  return (
    <div className="relative p-4 mt-6 border rounded-md bg-slate-100">
      {isUpdating && (
        <div className="absolute top-0 right-0 flex items-center justify-center w-full h-full rounded-md">
          <Loader2 className="w-6 h-6 text-sky-700 animate-spin" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Course Chapters
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleCreating}
        >
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Create Chapter
            </>
          )}
        </Button>
      </div>
      {!isCreating && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}
        >
          {initialData.title || "No title"}
        </p>
      )}
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                      className="w-full mt-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!isValid || isSubmitting}>
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}
        >
          {initialData.chapters.length ? (
            <ChaptersList
              onEdit={onEdit}
              onReorder={onReorder}
              items={initialData.chapters || []}
            />
          ) : (
            <p>No chapters</p>
          )}
        </div>
      )}
      {!isCreating && (
        <p className="mt-4 text-xs text-muted-foreground">Reorder chapters</p>
      )}
    </div>
  );
};
