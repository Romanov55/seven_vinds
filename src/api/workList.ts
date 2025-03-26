/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function handler(res: any) {
  try {
    const userId = 141636;
    const response = await axios.get(
      `http://185.244.172.108:8081/v1/outlay-rows/entity/${userId}/row/list`
    );
    res.status(200).json(response.data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: "Ошибка при загрузке данных" });
  }
}
