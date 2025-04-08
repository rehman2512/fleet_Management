import React from "react";
import Style from './index.module.css';

interface AddNewBtnProps {
    text: string;
    icon?: React.ReactNode; 
    onClick: () => void; 
}

const AddNewBtn: React.FC<AddNewBtnProps> = ({ text, icon, onClick }) => {
    return (
        <button onClick={onClick} className={Style.MainBtn}>
            {icon}{text}
        </button>
    );
};

export default AddNewBtn;