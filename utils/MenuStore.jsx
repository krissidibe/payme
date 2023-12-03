import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

 
 const useMenuStore =  create(
  persist(
    (set, get) => ({
      index: -1,
  setMenuIndex: (i) => set((state) => ({ index:i })),
  removeAllindex: () => set({ index: -1 }),
    }),
    {
      name: 'menu-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
/* 
 
 const useMenuStore = create((set) => ({
  index: -1,
  setMenuIndex: (i) => set((state) => ({ index:i })),
  removeAllindex: () => set({ index: 0 }),
}))
 */
 

 
export default useMenuStore