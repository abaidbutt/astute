import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import Toast from "./Toast";

const Notify = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      {auth.loading && <Loading />}
      {auth.registerError && (
        <Toast
          msg={{ msg: auth.registerError, title: "Error" }}
          bgColor="bg-danger"
        />
      )}

      {auth.registerSuccess && (
        <Toast
          msg={{ msg: auth.registerSuccess, title: "Success" }}
          bgColor="bg-success"
        />
      )}
    </>
  );
};

export default Notify;
