export type TFirebaseProviderProps = {
  children: React.ReactNode;
};

export interface IuseFirebaseDataContext {
  data:
    | {
        available: boolean;
        id: number;
        value: number;
      }[]
    | null;
}
