import { create } from "zustand";

interface Values {
  email: string;
  password: string;
  name: string;
  firstName: string;
  middle_name: string | null;
  paternalLastName: string;
  maternalLastName: string;
  status: "inactive";
}

interface ScrapDoctorTextState {
  searchText: string;
  addSearchText: (fulltName: string) => void;
  values: Values;
  addValues: (values: Values) => void;
}

const useScrapDoctorStore = create<ScrapDoctorTextState>((set) => ({
  searchText: "",
  addSearchText: (fulltName) =>
    set({
      searchText: `${fulltName}`,
    }),
  values: {} as Values,
  addValues: (values) => set({ values }),
}));

export default useScrapDoctorStore;
