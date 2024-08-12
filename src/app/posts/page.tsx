"use client";

import { AuthWrapper } from "@/components/AuthWrapper";
import { CreatePostDialog } from "@/components/CreateItemDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { postService } from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["items"],
    queryFn: postService.getPosts,
  });

  return (
    <AuthWrapper isPrivate>
      <main className="flex min-h-screen flex-col items-center justify-start p-24">
        <div className="flex flex-row items-center justify-center gap-8">
          <p className="font-bold">Hello, world!</p>
          <CreatePostDialog />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </AuthWrapper>
  );
}
