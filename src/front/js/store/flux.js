const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      auth: false,
      token: "Bienvenido",
      email: null,
      username: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },

    actions: {
      signup: async (username, email, password) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
          });

          if (!resp.ok) throw Error("There was a problem in the login request");

          if (resp.status === 401) {
            throw "Invalid credentials";
          } else if (resp.status === 400) {
            throw "Invalid email or password format";
          }
          const data = await resp.json();
          setStore({ username: username });
          setStore({ email: email });
          setStore({ password: password });

          localStorage.setItem("jwt-token", username);
          setStore({ token: username });
          return data;
        } catch (err) {
          	alert(err);
        }
      },

      login: async (username, password, navigate) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });

          if (resp.status === 401) {
            throw "Invalid credentials";
          } else if (resp.status === 400) {
            throw "Invalid credentials";
          }

          if (!resp.ok) throw Error("There was a problem in the login request");
          navigate("/private");
          const data = await resp.json();
          setStore({ username: username });
          setStore({ auth: true });
          localStorage.setItem("jwt-token", username);
          setStore({ token: username });
          return data;
        } catch (err) {
          	alert(err);
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        setStore({ auth: false });
        setStore({ email: null, username: null });
      },
    },
  };
};

export default getState;
