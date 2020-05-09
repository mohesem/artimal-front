const host =
  process.env.REACT_APP_ENV === "dev" ? "localhost:4000" : "194.5.175.201";

export default (_uri) => {
  const uri = `http://${host}/${_uri}`;

  console.log("uri is :::: ", uri);

  const h = new Headers();
  h.append("Content-Type", "application/json");
  const req = new Request(uri, {
    method: "DELETE",
  });

  return new Promise((resolve, reject) => {
    fetch(req)
      .then(async (res) => {
        console.log(res.status);
        const json = await res.json();
        console.log(json);
        if (res.ok) {
          resolve(json);
        } else {
          json.status = res.status;
          reject(json);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
