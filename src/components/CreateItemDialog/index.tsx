import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useInsert } from "@/hooks/useInsert";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "../ui/toaster";
import { useToast } from "../ui/use-toast";
import { PostDTO } from "@/interfaces/post";
import { postService } from "@/services/post.service";

const formSchema = z.object({
  description: z
    .string({
      message: "Title is required",
    })
    .min(1),
  content: z
    .string({
      message: "Content is required",
    })
    .min(1),
});

export const CreatePostDialog = () => {
  const { toast } = useToast();

  const form = useForm<PostDTO>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      content: "",
    },
  });

  const [open, setOpen] = useState(false);

  const { succeed, isLoading } = useInsert<PostDTO>(
    postService.createPost,
    "items"
  );

  const onSubmit = async (values: PostDTO) => {
    try {
      await succeed(values);
      setOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Item created successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <Toaster />
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create Post</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Creating an post!</DialogTitle>
          <DialogDescription>
            Fill the form below to create an post.
          </DialogDescription>
        </DialogHeader>

        <Form {...form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Title of your post" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="This post is awesome!"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button isLoading={isLoading} type="submit">
            Create
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
