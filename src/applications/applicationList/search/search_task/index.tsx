import * as _ from "@/applications/applicationList/search/search_task/style.ts";
import Up from "@/assets/search/point_up.svg";
import Down from "@/assets/search/point_down.svg";
import {useState} from "react";

interface FilterBlockProps {
    label: string;
    option: string;
    isOpen: boolean;
    onClick: () => void;
}

const Search_task = () => {
    const [animation, setAnimation] = useState(false);
    const [death, setDeath] = useState(false);
    const handleAnimation = () => {
        setAnimation(!animation)
    }
    const handleDeath = () => {
        setDeath(!death)
    }
    return (
        <_.search>
            <_.styles>
                <div>
                    <div>
                        <div>
                            <_.search_main>
                                <_.name>
                                    <label>이름</label>
                                    <_.black>
                                        <_.white>
                                            <_.dark>
                                                <_.input type={"text"}/>
                                            </_.dark>
                                        </_.white>
                                    </_.black>
                                </_.name>
                                <FilterBlock
                                    label="애니메이션"
                                    option="없음"
                                    isOpen={animation}
                                    onClick={handleAnimation}
                                />
                                <FilterBlock
                                    label="사인"
                                    option="모두"
                                    isOpen={death}
                                    onClick={handleDeath}
                                />
                            </_.search_main>
                        </div>
                    </div>
                </div>
            </_.styles>
        </_.search>
    );
}
const FilterBlock = ({ label, option, isOpen, onClick }: FilterBlockProps) => {
    return (
        <div>
            <label>{label}</label>
            <_.black>
                <_.white>
                    <_.dark>
                        <_.option>{option}</_.option>
                        <_.button onClick={onClick}>
                            <_.styles>
                                <div>
                                    <div>
                                        <div>
                                            <img src={isOpen ? Up : Down} alt={isOpen ? "close" : "open"} />
                                        </div>
                                    </div>
                                </div>
                            </_.styles>
                        </_.button>
                    </_.dark>
                </_.white>
            </_.black>
        </div>
    );
};
export default Search_task;