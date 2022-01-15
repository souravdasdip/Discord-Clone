import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "./SideBar";
import Chat from "./Chat";
import Login from "./Login";
import { selectUser, login, logout } from "./features/userSlice";
import { useEffect } from "react";
import { auth } from "./firebase";
// import Loading from "./Loading";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);

      if (authUser) {
        // Login
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  console.log(user);
  return (
    <div className="app">
      {user ? (
        <>
          <SideBar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
