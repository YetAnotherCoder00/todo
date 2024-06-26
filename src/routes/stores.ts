import { writable } from "svelte/store";

export const todos = writable("");
export const categories = writable(["Unfiled", "Personal", "Business"]);
