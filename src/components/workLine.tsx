import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LineType } from "../types";
import axios from "axios";
import { CreateLine } from "./createLine";
import { Line } from "./line";
import { useStore } from "../context";

interface Props {
  parentId?: number | null; 
  userId: number, 
  oldData: LineType; 
  isEditing?: boolean, 
  level?: number, 
  getList: () => void,
  parentPosition?: number;
}

export const WorkLine = ({ parentPosition, parentId, userId, oldData, isEditing = false, level = 0, getList }: Props) => {
  const [isEdit, setIsEdit] = useState(isEditing);
  const [isNewLine, setIsNewLine] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // вложенность максимальная
  const { depth, setDepth } = useStore();
  useEffect(() => {
    if (level > depth) {
      setDepth(level);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const elementRef = useRef<HTMLDivElement | null>(null);
  const [positionElement, setPositionElement] = useState<number | null>(null);
  
  // правильная отрисовка линий
  useLayoutEffect(() => {
    if (!elementRef.current) return;
  
    const updatePosition = () => {
      if (elementRef.current) {
        setPositionElement(elementRef.current.getBoundingClientRect().top);
      }
    };
  
    // Вызываем сразу после монтирования
    updatePosition();
  
    // Ждём полный рендер
    requestAnimationFrame(() => {
      setTimeout(updatePosition, 0);
    });
  
    // Отслеживаем изменения DOM
    const mutationObserver = new MutationObserver(updatePosition);
    mutationObserver.observe(elementRef.current, { attributes: true, childList: true, subtree: true });
  
    // Отслеживаем изменения размеров элемента
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(elementRef.current);
  
    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [oldData]);

  const [newData, setNewData] = useState({
    id: oldData?.id || null,
    equipmentCosts: oldData?.equipmentCosts || 0,
    estimatedProfit: oldData?.estimatedProfit || 0,
    machineOperatorSalary: oldData?.machineOperatorSalary || 0,
    mainCosts: oldData?.mainCosts || 0,
    materials: oldData?.materials || 0,
    mimExploitation: oldData?.mimExploitation || 0,
    overheads: oldData?.overheads || 0,
    parentId: parentId || oldData?.parentId || null,
    rowName: oldData?.rowName || "",
    salary: oldData?.salary || 0,
    supportCosts: oldData?.supportCosts || 0,
    child: oldData?.child || [],
  });
  
  // обновляем данные, если oldData изменилось
  useEffect(() => {
    if (oldData) {
      setNewData({
        id: oldData.id || null,
        equipmentCosts: oldData.equipmentCosts || 0,
        estimatedProfit: oldData.estimatedProfit || 0,
        machineOperatorSalary: oldData.machineOperatorSalary || 0,
        mainCosts: oldData.mainCosts || 0,
        materials: oldData.materials || 0,
        mimExploitation: oldData.mimExploitation || 0,
        overheads: oldData.overheads || 0,
        parentId: parentId || oldData.parentId || null,
        rowName: oldData.rowName || "",
        salary: oldData.salary || 0,
        supportCosts: oldData.supportCosts || 0,
        child: oldData.child || [],
      });
    }
  }, [oldData, parentId]);
  
  //обновление линии и данных
  const updateForm = async (e?: React.FormEvent) => {
    e?.preventDefault();
  
    if (isSubmitting) return;
  
    setIsSubmitting(true);
  
    try {
      await axios.post(`http://185.244.172.108:8081/v1/outlay-rows/entity/${userId}/row/${`${oldData.id}/update`}`, {
        equipmentCosts: newData.equipmentCosts,
        estimatedProfit: newData.estimatedProfit,
        machineOperatorSalary: newData.machineOperatorSalary,
        mainCosts: newData.mainCosts,
        materials: newData.materials,
        mimExploitation: newData.mimExploitation,
        overheads: newData.overheads,
        parentId: newData.parentId,
        rowName: newData.rowName,
        salary: newData.salary,
        supportCosts: newData.supportCosts,
      });

      setIsEdit(false);
      setIsSubmitting(false);
      getList()
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setIsSubmitting(false);
    }
  };

  // изменение линии
  const handleEdit = () => {
    if (!isEdit) {
      setIsEdit(true);
    }
  };

  // отправка изменений
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateForm();
    }
  };

  // удалить линию
  const deleteLine = async () => {
    try {
      const response = await fetch(`http://185.244.172.108:8081/v1/outlay-rows/entity/${userId}/row/${`${newData.id && newData.id}/delete`}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }

      getList();
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    }
  }

  // активация создания новой линии
  const createNewLine = async () => {
    setIsNewLine(true)
  }

  return (
    <>
      <div ref={elementRef}>
        <div className={`works__block ${isEdit ? 'active' : ''}`} onDoubleClick={handleEdit}>
          <div className="works__item">
          <div className="works__controller" style={{ "--ml": `${level}` } as Record<string, string>}>
              <button className="works__button" onClick={createNewLine}>
                {parentPosition && positionElement &&
                  <Line parentPosition={parentPosition} positionElement={positionElement} />
                }
                <svg className="works__img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5556 0H1.77778C0.8 0 0 0.8 0 1.77778V14.2222C0 15.2 0.8 16 1.77778 16H14.2222C15.2 16 16 15.2 16 14.2222V4.44444L11.5556 0ZM3.55556 3.55556H8V5.33333H3.55556V3.55556ZM12.4444 12.4444H3.55556V10.6667H12.4444V12.4444ZM12.4444 8.88889H3.55556V7.11111H12.4444V8.88889ZM10.6667 5.33333V1.77778L14.2222 5.33333H10.6667Z" fill="#7890B2" />
                </svg>
                </button>
              {newData.id && <button className="works__button" onClick={deleteLine}>
                <svg className="works__img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3704_301)">
                    <path d="M2.5 1C2.23478 1 1.98043 1.10536 1.79289 1.29289C1.60536 1.48043 1.5 1.73478 1.5 2V3C1.5 3.26522 1.60536 3.51957 1.79289 3.70711C1.98043 3.89464 2.23478 4 2.5 4H3V13C3 13.5304 3.21071 14.0391 3.58579 14.4142C3.96086 14.7893 4.46957 15 5 15H11C11.5304 15 12.0391 14.7893 12.4142 14.4142C12.7893 14.0391 13 13.5304 13 13V4H13.5C13.7652 4 14.0196 3.89464 14.2071 3.70711C14.3946 3.51957 14.5 3.26522 14.5 3V2C14.5 1.73478 14.3946 1.48043 14.2071 1.29289C14.0196 1.10536 13.7652 1 13.5 1H10C10 0.734784 9.89464 0.48043 9.70711 0.292893C9.51957 0.105357 9.26522 0 9 0L7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1H2.5ZM5.5 5C5.63261 5 5.75979 5.05268 5.85355 5.14645C5.94732 5.24021 6 5.36739 6 5.5V12.5C6 12.6326 5.94732 12.7598 5.85355 12.8536C5.75979 12.9473 5.63261 13 5.5 13C5.36739 13 5.24021 12.9473 5.14645 12.8536C5.05268 12.7598 5 12.6326 5 12.5V5.5C5 5.36739 5.05268 5.24021 5.14645 5.14645C5.24021 5.05268 5.36739 5 5.5 5ZM8 5C8.13261 5 8.25979 5.05268 8.35355 5.14645C8.44732 5.24021 8.5 5.36739 8.5 5.5V12.5C8.5 12.6326 8.44732 12.7598 8.35355 12.8536C8.25979 12.9473 8.13261 13 8 13C7.86739 13 7.74021 12.9473 7.64645 12.8536C7.55268 12.7598 7.5 12.6326 7.5 12.5V5.5C7.5 5.36739 7.55268 5.24021 7.64645 5.14645C7.74021 5.05268 7.86739 5 8 5ZM11 5.5V12.5C11 12.6326 10.9473 12.7598 10.8536 12.8536C10.7598 12.9473 10.6326 13 10.5 13C10.3674 13 10.2402 12.9473 10.1464 12.8536C10.0527 12.7598 10 12.6326 10 12.5V5.5C10 5.36739 10.0527 5.24021 10.1464 5.14645C10.2402 5.05268 10.3674 5 10.5 5C10.6326 5 10.7598 5.05268 10.8536 5.14645C10.9473 5.24021 11 5.36739 11 5.5Z" fill="#DF4444" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3704_301">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>}
            </div>
          </div>
          <div className="works__item">
            {isEdit ? <input onKeyDown={handleKeyDown} autoFocus onChange={(e) => setNewData({ ...newData, rowName: e.target.value })} value={newData.rowName} /> : <p>{newData.rowName}</p>}
          </div>
          <div className="works__item">
            {isEdit ? <input onKeyDown={handleKeyDown} type="number" onChange={(e) => setNewData({ ...newData, salary: Number(e.target.value) })} value={newData.salary} /> : <p>{newData.salary}</p>}
          </div>
          <div className="works__item">
            {isEdit ? <input onKeyDown={handleKeyDown} type="number" onChange={(e) => setNewData({ ...newData, equipmentCosts: Number(e.target.value) })} value={newData.equipmentCosts} /> : <p>{newData.equipmentCosts}</p>}
          </div>
          <div className="works__item">
            {isEdit ? <input onKeyDown={handleKeyDown} type="number" onChange={(e) => setNewData({ ...newData, overheads: Number(e.target.value) })} value={newData.overheads} /> : <p>{newData.overheads}</p>}
          </div>
          <div className="works__item">
            {isEdit ? <input onKeyDown={handleKeyDown} type="number" onChange={(e) => setNewData({ ...newData, estimatedProfit: Number(e.target.value) })} value={newData.estimatedProfit} /> : <p>{newData.estimatedProfit}</p>}
          </div>
        </div>
        {newData.child && newData.child
          .map((_item) => {
          return (
            <div key={_item.id}>
            {positionElement && <WorkLine parentPosition={positionElement} parentId={newData.id} userId={userId} isEditing={false} oldData={_item} level={level + 1} getList={getList} />}
            </div>
          )
        })}
        {isNewLine && positionElement && <CreateLine parentPosition={positionElement} setIsNewLine={setIsNewLine} userId={userId} parentId={newData.id} level={level + 1} getList={getList}/>}
      </div>
    </>
  );
};
