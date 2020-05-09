const host =
  process.env.REACT_APP_ENV === "dev" ? "localhost:4000" : "194.5.175.201";

export default (_uri, data) => {
  const uri = `http://${host}/${_uri}`;

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
