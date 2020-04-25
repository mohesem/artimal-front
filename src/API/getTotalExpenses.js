const host =
  process.env.REACT_APP_ENV === "dev" ? "localhost:4000" : "194.5.175.201";

export default (from, to) => {
  const uri = `http://${host}/api/v0/expenses/totalValue/${from}/${to}`;

  const h = new Headers();
  h.append("Content-Type", "application/json");
  const req = new Request(uri, {
    method: "GET",
    mode: "cors",
    headers: h,
  });

  return new Promise((resolve, reject) => {
    fetch(req)
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) return resolve(json);
        reject(json);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
