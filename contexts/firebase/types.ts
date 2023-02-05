import { TdataEntry } from "@/types/data";

export type TFirebaseProviderProps = {
  children: React.ReactNode;
};

export interface IuseFirebaseDataContext {
  handleSetData: ({ id, available, value }: TdataEntry) => void;
  cardClicked: { clicked: boolean; id: number | null };
  data: TdataEntry[] | null;
}
