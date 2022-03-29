import create from "zustand";
export const userAuthStore = create((set: any) => ({
  loggedIn: false,
  login: () => set({ loggedIn: true }),
  logout: () => set({ loggedIn: false }),
}));
