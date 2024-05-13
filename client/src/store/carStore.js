import {create} from 'zustand';

const useCarStore = create((set) => ({
  cars: [],
  unsavedCars: [],
  addCar: (car) => set((state) => ({ unsavedCars: [...state.unsavedCars, car] })),
  setCars: (cars) => set({ cars }),
}));

export default useCarStore;
