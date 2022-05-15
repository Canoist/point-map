import React from "react";

interface PointAddProps {
  onSubmit: any;
}

const PointAdd: React.FC<PointAddProps> = (props: PointAddProps) => {
  return (
    <div>
      Вкладка для добавления точки, на которой вводится название, описание точки
      и кликом по карте (предпочтительный вариант) или в просто в полях ввода
      указываются ее координаты
    </div>
  );
};
export default PointAdd;
