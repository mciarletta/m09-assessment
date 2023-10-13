import jwtDecode from "jwt-decode";


const LOCAL_STORAGE_TOKEN_KEY = "ffToken";

export async function login(Credentials) {
      const response = await fetch(
        `http://localhost:8080/authenticate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Credentials),
        }
      );
      if (response.status === 200) {
        const { jwt_token } = await response.json();
    //set the token in localStorage
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, jwt_token);
    return makeUserFromJWT(jwt_token);

      } else {
        return Promise.reject("Unauthorized.");

      }
    }


    export async function refreshToken() {
      const jwtToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      if (!jwtToken) {
        return Promise.reject("Unauthorized.");
      }
      const response = await fetch("http://localhost:8080/refresh_token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + jwtToken,
        },
      });
    
      // This code executes if the request is successful
      if (response.status === 200) {
        const { jwt_token } = await response.json();
        // NEW: set the token in localStorage
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, jwtToken);
        return makeUserFromJWT(jwt_token);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        return Promise.reject("Unauthorized.");
      }
    }

    function makeUserFromJWT(token) {
      // Decode the token
      const { sub: username, authorities: authoritiesString } = jwtDecode(token);
    
      // Split the authorities string into an array of roles
      const authorities = authoritiesString.split(",");
    
      // Create the "user" object
      return {
        username,
        authorities,
        token,
        hasRole(role) {
          return this.authorities.includes(role);
        },
      };
    }