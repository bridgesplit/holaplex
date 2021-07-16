export type Partial<ArweaveFile> = {
  name: string;
  type: string;
  url: string;
}

export type ArweaveOwner = {
  address: string;
}

export type ArweaveTag = {
  name: string;
  value: string;
}
export type ArweaveTransaction = {
  owner: ArweaveOwner;
  tags: ArweaveTag[];
}