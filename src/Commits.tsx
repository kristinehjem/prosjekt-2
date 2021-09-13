import { GITLAB_TOKEN } from "./tokens";

const url = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/11800";

export default function Commits() {
  getCommits();
  return <h1>Commits</h1>;
}

async function getCommits() {
  console.log(url + "/repository/commits");

  try {
    await fetch(url + "/repository/commits", {
      headers: new Headers({
        Authorization: "Bearer " + GITLAB_TOKEN,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]); // Loging only for testing purposes
        return data;
      });
  } catch {
    console.log("Failed fetching commits");
    return new Error("Failed fetching commits");
  }
}

function presentCommits() {
  let allCommits = getCommits();
  //  console.log(allCommits[0]);  // Creates error due to strong typing
}
