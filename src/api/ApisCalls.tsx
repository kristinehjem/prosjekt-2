import { GITLAB_TOKEN } from "../tokens";

const url = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/11800";

export async function getIssuesFromGitlab() {
    return getDataFromGitlab("/issues");
}

async function getDataFromGitlab(urlSuffix: String) {
    console.log(url + urlSuffix);
  
    try {
      await fetch(url + urlSuffix, {
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
      console.log("Failed fetching", urlSuffix);
      return new Error("Failed fetching" + urlSuffix);
    }
  }