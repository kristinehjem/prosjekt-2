import { GITLAB_TOKEN } from "../tokens";

const url = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/11800";

export async function getIssuesFromGitlab() {
    return getDataFromGitlab("/issues");
}

async function getDataFromGitlab(urlSuffix: String) {
    try {
      const res = await fetch(
        url + urlSuffix,
        {
        headers: new Headers({
          Authorization: "Bearer " + GITLAB_TOKEN,
        }),
      })
      console.log(res);
      return res.json();
    } catch {
      console.log("Failed fetching", urlSuffix);
      return new Error("Failed fetching" + urlSuffix);
    }
  }