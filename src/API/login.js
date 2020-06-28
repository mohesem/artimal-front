const host =
  process.env.REACT_APP_ENV === "dev" ? "localhost:4000" : "45.149.77.174";

export default (data) => {
  const uri = `http://${host}/api/v0/user/signin`;

  const h = new Headers();
  h.append("Content-Type", "application/json");
  const req = new Request(uri, {
    method: "POST",
    body: JSON.stringify(data),
    mode: "cors",
    headers: h,
  });

  return new Promise((resolve, reject) => {
    fetch(req)
      .then(async (res) => {
        const json = await res.json();
        console.log(json);
        if (res.ok) resolve(json);
        else reject(json);
      })
      .catch((err) => {
        console.log("is errrrrrrror ");
        reject(err);
      });
  });
};
