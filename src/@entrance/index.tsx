const el = document.getElementById("root")!;

el.innerHTML = "Hello Worldss";

el.appendChild(document.createElement("h1", { is: "hello" }));
