import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { userActions } from "_store";

export { Home };

function Home() {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((x) => x.auth);
  const { users } = useSelector((x) => x.users);
  console.log(authUser);

  useEffect(() => {
    dispatch(userActions.getAll());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Bienvenido: {authUser?.email}!</h1>

      {users.length && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      )}
      {users.loading && (
        <div className="spinner-border spinner-border-sm"></div>
      )}
      {users.error && (
        <div className="text-danger">
          Error loading users: {users.error.message}
        </div>
      )}
    </div>
  );
}
