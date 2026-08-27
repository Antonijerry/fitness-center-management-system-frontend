const AUTH_UNAUTHORIZED_EVENT =
  "fitness-auth-unauthorized";

export const authEvents = {
  emitUnauthorized(): void {
    window.dispatchEvent(
      new Event(AUTH_UNAUTHORIZED_EVENT),
    );
  },

  onUnauthorized(
    callback: () => void,
  ): () => void {
    window.addEventListener(
      AUTH_UNAUTHORIZED_EVENT,
      callback,
    );

    return () => {
      window.removeEventListener(
        AUTH_UNAUTHORIZED_EVENT,
        callback,
      );
    };
  },
};