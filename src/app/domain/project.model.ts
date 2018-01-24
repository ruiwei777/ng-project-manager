export interface Project {
    id?: string;
    name: string;
    desc?: string;
    coverImg?: string;
    enabled?: boolean;
    taskLists?: string[]; // ids of its task lists
    members?: string[]; // ids of its members
  }
  