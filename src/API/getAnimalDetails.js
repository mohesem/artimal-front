const host =
  process.env.REACT_APP_ENV === "dev" ? "localhost:4000" : "194.5.175.201";

export default (plaque) => {
  const uri = `http://${host}/api/v0/animal/detail/${plaque}`;

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
        if (res.ok) resolve(json);
        else reject(json);
      })
      .catch((err) => {
        console.log("..............", err);
        reject(err);
      });
  });
};
