import {
  QueryClient,
} from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /*
       * Don't immediately refetch every time
       * the user changes browser tabs.
       */
      refetchOnWindowFocus: false,

      /*
       * Retry failed queries twice.
       */
      retry: 2,

      /*
       * Data remains fresh for one minute.
       */
      staleTime: 60_000,
    },

    mutations: {
      /*
       * Authentication mutations should not
       * automatically retry.
       *
       * For example, an incorrect password should
       * immediately return the backend error.
       */
      retry: false,
    },
  },
});