export type IData = {
  name: string;
  id: string
}

export type TUseFetchData = (query: string) => {data: IData[], loading: boolean, error: string | boolean}