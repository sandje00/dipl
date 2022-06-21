const refreshUser = store => {
  return !store.state.auth.user && store.dispatch('auth/fetchUser')
    .catch(() => {});
};

export default refreshUser;
