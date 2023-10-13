export async login(Credentials) {
      const response = await fetch(
        `http://localhost:8080/authenticate`,
        {
          method: "POST",
          body: JSON.stringify(Credentials);
        }
      );
      if (response.status === 200) {
        return true;
      } else {
        return Promise.reject(
          new Error(`Unexpected status code ${response.status}`)
        );
      }
    }