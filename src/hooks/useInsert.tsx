import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useInsert<T>(fn: (data: T) => Promise<T>, key: string) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: fn,
    onSuccess: (variables) => {
      const cached = queryClient.getQueryData([key]) as T[];

      queryClient.setQueryData([key], (data) => {
        return [...(data as any[]), { id: cached.length + 1, ...variables }];
      });
    },
  });

  const succeed = async (values: T) => {
    try {
      await mutateAsync(values);
    } catch (error) {
      console.error(error);
    }
  };

  return { succeed, isLoading: isPending };
}
