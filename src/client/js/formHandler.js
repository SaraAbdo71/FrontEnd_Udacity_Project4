async function sendRequest(url, data = {}, method = "GET") {
  var options = {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer", 
  };
  if (method != "GET") {
    options.body = JSON.stringify(data); 
  }
  const response = await fetch(url, options);

  return response.json(); 
}

function handleSubmit(event) {
  event.preventDefault();
  let formText = document.getElementById("name").value;

  if (Client.checkForUrl(JSON.parse(JSON.stringify(formText)))) {
    console.log("::: Form Submitted :::");

    sendRequest(
      "http://localhost:8081/article",
      { text: formText },
      "POST"
    ).then((res) => {
      console.log(res);
      document.getElementById("results").innerHTML =
        "Polarity : " + res.polarity + "<br/>" + 
        "Subjectivity : " + res.subjectivity + "<br/>" + 
        "Text : " + res.text + "<br/>" + 
        "Polarity Confidence : " + res.polarity_confidence + "<br/>" + 
        "Subjectivity Confidence : " + res.subjectivity_confidence;
    })
  } else {
    document.getElementById("results").innerHTML =
      "The URL:[" +
      JSON.stringify(formText) +
      "] is not valide. Please enter a valid url";

    console.log("::: Form NOT Submitted :::");
  }
  return false;
}

export { handleSubmit };
