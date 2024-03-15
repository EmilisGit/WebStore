async function insertTemplates(source, target) {
  const templates = await fetch(source).then((d) => d.text());
  target.insertAdjacentHTML("beforeend", templates);
}

function cloneTemplate(template) {
  if (template != null) {
    return template.content.cloneNode(true);
  }
  console.error("No template provided");
}

async function fetchData(path) {
  try {
    const objects = await fetch(path);
    return await objects.json();
  } catch (error) {
    console.error(error);
  }
}

async function postTo(url, data) {
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, header);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { insertTemplates, cloneTemplate, fetchData, postTo };
