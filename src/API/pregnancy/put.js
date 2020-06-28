const host =
  process.env.REACT_APP_ENV === "dev" ? "localhost:4000" : "45.149.77.174";

export default (data) => {
  const uri = `http://${host}/api/v0/pregnancy/create`;

  const h = new Headers();
  h.append("Content-Type", "application/json");
  const req = new Request(uri, {
    method: "PUT",
    body: JSON.stringify(data),
    mode: "cors",
    headers: h,
  });

  return new Promise((resolve, reject) => {
    fetch(req)
      .then(async (res) => {
        const json = await res.json();
        console.log("put new death on db res ::: ", json);
        if (res.ok) return resolve(json);
        reject(json);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
