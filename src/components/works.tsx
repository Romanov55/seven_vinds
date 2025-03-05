import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { WorkLine } from "./workLine";
import { LineType } from "../types";
import { CreateLine } from "./createLine";
import { useStore } from "../context";

export const Works = () => {
  const userId = 141636
  const [workList, setWorkList] = useState<LineType[]>([])

  const { depth } = useStore();

  // обновление данных
  const getList = async () => {
    try {
      const response = await axios.get(
        `http://185.244.172.108:8081/v1/outlay-rows/entity/${userId}/row/list`
      );
      setWorkList(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  useLayoutEffect(() => {
    getList();
  }, []);
  
  return (
    <section className="works" style={{ "--depth": `${depth}` } as Record<string, string>}>
      <div className="works__header works__block">
        <p className="works__item">Уровень</p>
        <p className="works__item">Наименование работ</p>
        <p className="works__item">Основная з/п</p>
        <p className="works__item">Оборудование</p>
        <p className="works__item">Накладные расходы</p>
        <p className="works__item">Сметная прибыль</p>
      </div>

      <div className={`works__list`}>
        {workList.length > 0 ? workList.map((_item) => (
          <div key={_item.id}>
            <WorkLine userId={userId} isEditing={false} oldData={_item} getList={getList} />
          </div>
        )): 
          <CreateLine userId={userId} level={0} getList={getList}/>
        }
      </div>
    </section>
  );
};