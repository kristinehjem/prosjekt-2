import { ReactNode } from "react";

export interface Issue {
    title: string;
    state: string;
    description: string;
    iid: number;
    labels: string[];
}

export interface Api_commits {
    id: string;
    short_id: string;
    created_at: string;
    parent_ids: string[];
    title: string;
    message: string;
    author_name: string;
    author_email: string;
    authored_date: string;
    committer_name: string;
    committer_email: string;
    committed_date: string;
    web_url: string;
}

export interface commitsByDate {
    date: string,
    commits: number
}

export type contentContextApiProps = {
    children: ReactNode,
}
