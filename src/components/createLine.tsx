import { useRef, useState } from "react";
import axios from "axios";
import { Line } from "./line";

interface Props {
  parentId?: number | null; 
  userId: number, 
  level?: number,
  setIsNewLine?: (value: boolean) => void,
  getList: () => void
  parentPosition?: number;
}

export const CreateLine = ({ parentPosition, parentId, userId, level = 0, setIsNewLine, getList }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const elementRef = useRef<HTMLDivElement | null>(null);
  const positionElement = elementRef.current && elementRef.current.getBoundingClientRect().top || null;
  
  const [newData, setNewData] = useState({
    id: null,
    equipmentCosts: 0,
    estimatedProfit: 0,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    overheads: 0,
    parentId: parentId || null,
    rowName: "",
    salary: 0,
    supportCosts: 0,
  });

  const createForm = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
    if (isSubmitting) return;
    setIsSubmitting(true);
  
    try {
      await axios.post(`${API_BASE_URL}/v1/outlay-rows/entity/${userId}/row/create`, {
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

      getList()
      
      setTimeout(() => {
        if (setIsNewLine) {
          setIsNewLine(false);
        }
      }, 0);
      
      setIsSubmitting(false);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createForm();
    }
  };

  return (
    <>
      <div ref={elementRef}>
        <div className={`works__block active newLine`}>
          <div className="works__item">
            <div className={`works__controller`} style={{ marginLeft: `${level * 20}px` }}>
              <button className="works__button">
                {parentPosition && positionElement &&
                  <Line parentPosition={parentPosition} positionElement={positionElement} />
                }
                <svg className="works__img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5556 0H1.77778C0.8 0 0 0.8 0 1.77778V14.2222C0 15.2 0.8 16 1.77778 16H14.2222C15.2 16 16 15.2 16 14.2222V4.44444L11.5556 0ZM3.55556 3.55556H8V5.33333H3.55556V3.55556ZM12.4444 12.4444H3.55556V10.6667H12.4444V12.4444ZM12.4444 8.88889H3.55556V7.11111H12.4444V8.88889ZM10.6667 5.33333V1.77778L14.2222 5.33333H10.6667Z" fill="#7890B2" />
                </svg>
                </button>
            </div>
          </div>
          <div className="works__item">
            <input onKeyDown={handleKeyDown} onChange={(e) => setNewData({ ...newData, rowName: e.target.value })} value={newData.rowName} />
          </div>
          <div className="works__item">
            <input onKeyDown={handleKeyDown} type="number" onChange={(e) => setNewData({ ...newData, salary: Number(e.target.value) })} value={newData.salary} />
          </div>
          <div className="works__item">
            <input onKeyDown={handleKeyDown} type="number" onChange={(e) => setNewData({ ...newData, equipmentCosts: Number(e.target.value) })} value={newData.equipmentCosts} />
          </div>
          <div className="works__item">
            <input onKeyDown={handleKeyDown} type="number" onChange={(e) => setNewData({ ...newData, overheads: Number(e.target.value) })} value={newData.overheads} />
          </div>
          <div className="works__item">
            <input onKeyDown={handleKeyDown} type="number" onChange={(e) => setNewData({ ...newData, estimatedProfit: Number(e.target.value) })} value={newData.estimatedProfit} />
          </div>
        </div>
      </div>
    </>
  );
};
