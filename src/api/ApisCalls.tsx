import { GITLAB_TOKEN } from "../api/tokens";

const url = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/11800";
const perPage = 100;

export async function getIssuesFromGitlab() {
  return getAllData("/issues");
}

export async function getCommitsFromGitlab() {
  return getAllData("/repository/commits");
}

async function getDataFromGitlab(urlSuffix: String) {
  try {
    const res = await fetch(url + urlSuffix, {
      headers: new Headers({
        Authorization: "Bearer " + GITLAB_TOKEN,
      }),
    });
    return res.json();
  } catch {
    console.log("Failed fetching", urlSuffix);
    return new Error("Failed fetching" + urlSuffix);
  }
}

async function getAllData(urlSuffix: String) {
  let allResponses: any = [];
  let sizeOfResponse = perPage;
  let iterator = 1;

  while (sizeOfResponse === perPage) {
    const response = await getDataFromGitlab(
      urlSuffix + "?per_page=" + perPage + "&page=" + iterator
    );
    response.map((res: any) => {
      allResponses.push(res);
    });
    sizeOfResponse = response.length;
    iterator++;
  }
  return allResponses;
}
