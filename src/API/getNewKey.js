const host =
  process.env.REACT_APP_ENV === "dev" ? "localhost:4000" : "194.5.175.201";

export default () => {
  const uri = `http://${host}/api/v0/key/new`;

  const h = new Headers();
  h.append("Content-Type", "application/json");
  const req = new Request(uri);

  return new Promise((resolve, reject) => {
    fetch(req)
      .then(async (res) => {
        const json = await res.json();
        console.log(json);
        if (res.ok) {
          resolve(json);
        } else {
          reject(json);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
