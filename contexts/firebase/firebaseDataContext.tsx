import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseConfig } from "@/config/firebaseConfig";
import { IuseFirebaseDataContext, TFirebaseProviderProps } from "./types";
import { TdataEntry } from "@/types/data";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const dbRefName = "entries";

export const FirebaseDataContext = createContext<
  IuseFirebaseDataContext | undefined
>(undefined);

export const FirebaseDataContextProvider = function ({
  children,
}: TFirebaseProviderProps): React.ReactElement {
  const [data, setData] = useState<TdataEntry[] | null>(null);
  const database = getDatabase(firebaseApp);

  const handleSetData = ({ id, available, value }: TdataEntry): void => {
    set(ref(database, `${dbRefName}/` + id), {
      id,
      available,
      value,
    });
  };

  useEffect(() => {
    const entries = ref(database, dbRefName);

    return onValue(entries, (snapshot) => {
      if (snapshot.exists()) {
        const dbData = snapshot.val();

        setData(dbData);
        return;
      }
    });
  }, [database]);

  const value = { data, handleSetData };

  return (
    <FirebaseDataContext.Provider value={value}>
      {children}
    </FirebaseDataContext.Provider>
  );
};

export const useFirebaseDataContext = function (): IuseFirebaseDataContext {
  const context = useContext(FirebaseDataContext);

  if (context === undefined) {
    throw new Error(
      "useFirebaseDataContext can only be used inside a FirebaseDataContextProvider"
    );
  }

  return context;
};
