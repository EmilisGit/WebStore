async function postUser() {
  const submitUser = document.getElementById("submitUser");
  const userEmail = document.getElementById("userEmail").value;
  const response = await postTo("/user", {
    email: userEmail,
  });
}

async function postTo(url, data) {
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, header);
  return response;
}
