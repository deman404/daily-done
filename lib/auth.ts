import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebaseConfig";
import { LoginProps, AddUSerProps } from "@/type";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
//initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

const loginHandler = ({ email, password }: LoginProps) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      toast("login Done redirecting...");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast(errorMessage);
    });
};

const CreatUserHandler = ({ email, password, name }: LoginProps) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = userCredential.user.uid;
      console.log(userCredential);
      try {
        AddUserDataToDB({
          userId: uid,
          name: name,
          email: email,
        });
      } catch (error) {
        toast("can t save data ");
        console.log(error);
      }
      toast("Register Done try to login now");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast(errorMessage);
    });
};


const AddUserDataToDB = ({ userId, name, email }: AddUSerProps) => {
  set(ref(database, "users/" + userId), {
    username: name,
    email: email,
  });
};

export { loginHandler, CreatUserHandler };
