import { updateUser } from "./slices/userSlice";
import { updateRole } from "./slices/roleSlice";
import { getLocalItem } from "./localStorage";

export const initializeAuth = (store) => {
    const user = getLocalItem("user");
    const role = getLocalItem("role");

    if (user) {
        store.dispatch(updateUser({ value: user }));
    }

    if (role) {
        store.dispatch(updateRole({ value: role }));
    }
};
