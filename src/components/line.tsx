interface Props {
  parentPosition: number;
  positionElement: number;
}

export const Line = ({parentPosition, positionElement} : Props) => {
  
  return (
    <svg className="lines__img" width="12" height={`${positionElement - parentPosition - 5}`} viewBox={`0 0 12 ${positionElement - parentPosition}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0.5" y1={`${positionElement - parentPosition}`} x2="0.499998" y2="2.18557e-08" stroke="#C6C6C6"/>
      <line x1="1" y1={`${positionElement - parentPosition - .5}`} x2="12" y2={`${positionElement - parentPosition - .5}`} stroke="#C6C6C6"/>
    </svg> 
  );
};