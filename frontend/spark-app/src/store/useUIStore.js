import {create} from 'zustand';

const themeOptions = ['light', 'dark', 'spacey'];

const useUIStore = create((set) => ({
    theme: 'light',
    themeOptions,
    setTheme: (theme) => set({ theme }),
  }));

export default useUIStore;