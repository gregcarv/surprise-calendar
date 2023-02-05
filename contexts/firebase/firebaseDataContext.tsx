import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseConfig } from "@/config/firebaseConfig";
import { IuseFirebaseDataContext, TFirebaseProviderProps } from "./types";
import { TdataEntry } from "@/types/data";
import { hasCookie, setCookie, getCookie } from "cookies-next";

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
  const [cardClicked, setCardClicked] = useState<{
    clicked: boolean;
    id: number | null;
  }>({ clicked: false, id: null });
  const database = getDatabase(firebaseApp);

  const handleSetData = ({ id, available, value }: TdataEntry): void => {
    const cookie = hasCookie("card-clicked");

    if (!cookie) {
      setCookie("card-clicked", id, { maxAge: 60 * 60 * 24 });
      setCardClicked({ clicked: true, id });

      set(ref(database, `${dbRefName}/` + id), {
        id,
        available,
        value,
      });
    }
  };

  useEffect(() => {
    const cookie = hasCookie("card-clicked");
    if (cookie) {
      const cookieVal = getCookie("card-clicked");
      setCardClicked({ clicked: true, id: Number(cookieVal) });
    }
  }, []);

  useEffect(() => {
    const entries = ref(database, dbRefName);

    return onValue(entries, (snapshot) => {
      if (snapshot.exists()) {
        const dbData = snapshot.val();

        setData(dbData);
        return;
      }
    });
  }, [cardClicked, database]);

  const value = { data, handleSetData, cardClicked };

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
