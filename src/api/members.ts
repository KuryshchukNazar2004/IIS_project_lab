import axios from 'axios';

interface Member {
  id?: string;
  name: string;
  email: string;
}

const BASE_URL = 'https://67881e73c4a42c9161095a60.mockapi.io/api/v1';

export const fetchMembersApi = async (): Promise<Member[]> => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

export const createMemberApi = async (member: Member): Promise<Member> => {
  const response = await axios.post(`${BASE_URL}/users`, member);
  return response.data;
};

export const updateMemberApi = async (
  id: string,
  member: Member
): Promise<Member> => {
  const response = await axios.put(`${BASE_URL}/users/${id}`, member);
  return response.data;
};

export const deleteMemberApi = async (id: string): Promise<Member> => {
  const response = await axios.delete(`${BASE_URL}/users/${id}`);
  return response.data;
};
