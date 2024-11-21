export default function useAuth() {
  const { auth } = useSupabaseClient();

  const user = useSupabaseUser();
  const isAuthenticated = computed(() => Boolean(user.value));

  function useSignIn(email: string, password: string) {
    return auth.signInWithPassword({ email, password });
  }

  function useSignUp(email: string, password: string) {
    return auth.signUp({ email, password });
  }

  function useSignOut() {
    return auth.signOut();
  }

  return { user, isAuthenticated, useSignIn, useSignUp, useSignOut };
}
