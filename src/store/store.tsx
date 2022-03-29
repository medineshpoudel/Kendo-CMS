import create from "zustand";
const UseStore = create((set: any) => ({}));
export const notification = create((set: any) => ({
  isSuccess: false,
  submit: () => {
    set({ isSuccess: true });
  },
  dissolveSubmit: () => {
    set({ isSuccess: false });
  },
}));
export default UseStore;
