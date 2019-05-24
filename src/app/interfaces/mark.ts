export interface Mark {
  id: number;
  name: string;
  children: Children[];
}

interface Children {
  name: string;
  parent_id: number;
}
