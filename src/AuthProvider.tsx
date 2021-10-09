import React, {useState} from "react";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {useEffect} from "react";

interface AuthProviderProps {}

type User = null | {
  firebaseAuthData: FirebaseAuthTypes.User;
  userName: string;
};

export const AuthContext = React.createContext<{
  user: User;
  loading: boolean;
  errorMsg: string;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  clearError: () => void;
}>({
  user: null,
  loading: true,
  errorMsg: "",
  signup: () => null,
  login: () => null,
  logout: () => null,
  clearError: () => null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User>(null);
  const [init, setInit] = useState(true);
  const [errorMsg, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onAuthStateChangeHandler = (userData: FirebaseAuthTypes.User | null) => {
    if (init) setInit(false);

    // Already initialized
    if (!init) {
      setLoading(false);
    }

    if (userData) {
      // React Native Firebase automatically persist user login state
      const displayName = userData.displayName ?? "";
      setUser({userName: displayName, firebaseAuthData: userData});
    } else setUser(null);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChangeHandler);
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: loading,
        errorMsg: errorMsg,
        signup: (email, password) => {
          setLoading(true);

          if (email === "" || password === "") {
            setError("Email or password can't be empty");
            setLoading(false);
            return;
          }

          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              console.log("User account created & signed in!");
            })
            .catch(error => {
              setLoading(false);
              if (error.code === "auth/email-already-in-use") {
                setError("Email adress already in use!");
              }

              if (error.code === "auth/invalid-email") {
                setError("That email address is invalid!");
              }
              if (error.code === "auth/weak-password") {
                setError("Password should be at least 6 characters!");
              }

              console.error(error);
            });
        },
        // Login API called here
        login: async (email, password) => {
          setLoading(true);

          if (email === "" || password === "") {
            setError("Email or password can't be empty");
            setLoading(false);
            return;
          }

          auth()
            .signInWithEmailAndPassword(email, password)
            .then(
              _ => {
                console.log("success sign in");
                setError("");
              },
              error => {
                if (error.code === "auth/invalid-email") setError("Invalid email address");

                if (error.code === "auth/user-not-found") setError("Account doesn't exist");

                console.error(error.code);
              }
            )
            .then(() => setLoading(false));
        },
        // Logout API called here
        logout: () => {
          auth()
            .signOut()
            .then(
              _ => {
                console.log("success sign out");
              },
              error => {
                console.log("sign out failed.");
                console.error(error);
              }
            );
        },
        //Clear error message
        clearError: () => {
          setError("");
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
