import api from "./api";
import IState from "@/src/interfaces/IState";

const statesUrl = "states/";

export const createState = async (state: IState) => {
   const response = await api.post<IState>(statesUrl, state);
   return response.data;
};

export const getStates = async (): Promise<IState[]> => {
   const response = await api.get<IState[]>(statesUrl);
   return response.data;
};

export const getState = async (id: number) => {
   const response = await api.get<IState>(`${statesUrl}${id}`);
   return response.data;
};

export const updateState = async (id: number, state: IState) => {
   return api.put<IState>(`${statesUrl}${id}`, state);
};

export const deleteState = async (id: number) => {
   return api.delete(`${statesUrl}${id}`);
};
