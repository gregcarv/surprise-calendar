// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  createContext,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { firebaseConfig } from "./firebaseConfig";
import { IuseFirebaseDataContext, TFirebaseProviderProps } from "./types";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const FirebaseDataContext = createContext<
  IuseFirebaseDataContext | undefined
>(undefined);

export const FirebaseDataContextProvider = function ({
  children,
}: TFirebaseProviderProps): React.ReactElement {
  const [data, setData] = useState(null);

  useEffect(() => {
    const database = getDatabase(firebaseApp);
    const entries = ref(database, "entry");

    return onValue(entries, (snapshot) => {
      if (snapshot.exists()) {
        const dbData = snapshot.val();

        setData(dbData);
        return;
      }
    });
  }, []);

  const value = { data };

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
